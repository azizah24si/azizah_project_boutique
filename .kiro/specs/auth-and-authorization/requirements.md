# Requirements Document

## Introduction

Dokumen ini mendefinisikan requirement untuk implementasi sistem autentikasi dan otorisasi berbasis role (Admin, Member, Guest) pada Boutique Management System Azizah. Sistem ini akan melengkapi CRUD operations yang sudah terintegrasi dengan Supabase dengan layer keamanan yang robust, session management yang persist, dan role-based access control (RBAC) menggunakan Row Level Security (RLS) policies di Supabase.

## Glossary

- **System**: Boutique Management System dengan React frontend dan Supabase backend
- **Auth_Context**: React Context untuk mengelola authentication state secara global
- **Protected_Route**: React component yang mem-guard routes berdasarkan authentication dan role
- **Supabase_Auth**: Supabase Authentication service untuk login/register/logout
- **Session**: Authentication session yang disimpan di browser dan auto-refresh oleh Supabase
- **Profile**: Tabel public.profiles yang berisi user metadata (role, member_level, loyalty_points)
- **Admin_User**: User dengan role 'admin' yang memiliki akses penuh ke admin dashboard
- **Member_User**: User dengan role 'member' yang memiliki akses ke member dashboard
- **Guest_User**: User yang tidak authenticated, hanya dapat akses halaman publik
- **RLS_Policy**: Row Level Security policies di Supabase untuk enforce authorization di database level
- **Token_Refresh**: Mekanisme automatic refresh access token sebelum expired
- **Login_Flow**: Proses autentikasi user dengan email dan password
- **Register_Flow**: Proses registrasi user baru dengan auto-create profile
- **Logout_Flow**: Proses sign out dan clear session
- **Redirect_Logic**: Logic untuk mengarahkan user ke halaman yang sesuai berdasarkan role

## Requirements

### Requirement 1: Session Management dan Persistence

**User Story:** Sebagai user yang sudah login, saya ingin session saya tersimpan saat browser di-refresh, sehingga saya tidak perlu login ulang setiap kali membuka aplikasi.

#### Acceptance Criteria

1. WHEN application mount, THE Auth_Context SHALL memanggil supabase.auth.getSession() untuk retrieve existing session
2. WHEN session valid ditemukan, THE Auth_Context SHALL set user state dengan session.user
3. WHEN session valid ditemukan, THE Auth_Context SHALL fetch profile data dari public.profiles berdasarkan user.id
4. WHEN user refresh browser, THE System SHALL preserve authentication state dan tidak redirect ke login
5. THE Auth_Context SHALL subscribe ke supabase.auth.onAuthStateChange() untuk listen perubahan authentication state
6. WHEN access token mendekati expired, THE Supabase_Auth SHALL automatically refresh token tanpa user interaction
7. WHEN session expired dan tidak bisa di-refresh, THE System SHALL logout user dan redirect ke login page
8. THE System SHALL menampilkan loading state selama proses fetch session dan profile

### Requirement 2: Login Flow dengan Role-Based Redirect

**User Story:** Sebagai user, saya ingin login dengan email dan password, dan diarahkan ke dashboard yang sesuai dengan role saya (admin atau member).

#### Acceptance Criteria

1. WHEN user submit login form, THE Login_Flow SHALL call supabase.auth.signInWithPassword() dengan email dan password
2. WHEN login berhasil, THE System SHALL fetch profile.role dari public.profiles berdasarkan user.id
3. WHEN profile.role adalah 'admin', THE System SHALL redirect ke /admin
4. WHEN profile.role adalah 'member', THE System SHALL redirect ke /member
5. WHEN login gagal karena credential salah, THE System SHALL display error message "Email atau password salah"
6. WHEN login gagal karena koneksi error, THE System SHALL display error message "Gagal terhubung ke server"
7. THE Login form SHALL disable submit button dan show loading state selama proses login
8. WHEN login berhasil, THE Auth_Context SHALL update user dan profile state secara otomatis via onAuthStateChange listener

### Requirement 3: Register Flow dengan Auto-Create Profile

**User Story:** Sebagai user baru, saya ingin mendaftar akun dengan email, password, dan nama lengkap, sehingga saya bisa mengakses fitur member.

#### Acceptance Criteria

1. WHEN user submit register form, THE Register_Flow SHALL call supabase.auth.signUp() dengan email, password, dan metadata {full_name}
2. WHEN signUp berhasil, THE Supabase_Auth SHALL trigger database trigger handle_new_user()
3. WHEN trigger execute, THE Database SHALL insert new record ke public.profiles dengan id=user.id, full_name=metadata.full_name, role='member'
4. WHEN registration complete, THE System SHALL auto-login user dan redirect ke /member
5. WHEN email sudah terdaftar, THE System SHALL display error message "Email sudah digunakan"
6. WHEN password kurang dari 6 karakter, THE System SHALL display error message "Password minimal 6 karakter"
7. THE Register form SHALL validate email format sebelum submit
8. THE Register form SHALL disable submit button dan show loading state selama proses registration

### Requirement 4: Logout Flow dengan Session Cleanup

**User Story:** Sebagai user yang sudah login, saya ingin logout dari aplikasi, sehingga session saya cleared dan saya redirect ke home page.

#### Acceptance Criteria

1. WHEN user click logout button, THE Logout_Flow SHALL call supabase.auth.signOut()
2. WHEN signOut execute, THE Supabase_Auth SHALL invalidate current session dan remove dari browser storage
3. WHEN signOut berhasil, THE Auth_Context SHALL set user state ke null
4. WHEN signOut berhasil, THE Auth_Context SHALL set profile state ke null
5. WHEN signOut berhasil, THE System SHALL redirect ke /guest (home page)
6. THE System SHALL clear semua authentication state dari memory
7. WHEN user try access protected route setelah logout, THE Protected_Route SHALL redirect ke /login
8. THE Logout process SHALL execute instantly tanpa loading state yang terlihat ke user

### Requirement 5: Protected Route untuk Admin

**User Story:** Sebagai system, saya ingin memastikan hanya user dengan role 'admin' yang bisa mengakses admin routes (/admin/*), sehingga data sensitif terlindungi.

#### Acceptance Criteria

1. WHEN unauthenticated user try access /admin/*, THE Protected_Route SHALL redirect ke /login
2. WHEN authenticated user dengan role 'member' try access /admin/*, THE Protected_Route SHALL redirect ke /guest
3. WHEN authenticated user dengan role 'admin' access /admin/*, THE Protected_Route SHALL render admin dashboard
4. THE Protected_Route SHALL check allowedRoles=['admin'] untuk semua admin routes
5. THE Protected_Route SHALL show loading spinner selama Auth_Context.loading === true
6. THE Protected_Route SHALL use <Navigate replace /> untuk prevent back button loop
7. THE System SHALL protect routes: /admin, /admin/product, /admin/orders, /admin/customers
8. THE System SHALL NOT restrict access ke guest routes (/guest/*) untuk authenticated users

### Requirement 6: Protected Route untuk Member

**User Story:** Sebagai system, saya ingin memastikan hanya user dengan role 'member' yang bisa mengakses member routes (/member/*), sehingga setiap user hanya melihat data mereka sendiri.

#### Acceptance Criteria

1. WHEN unauthenticated user try access /member/*, THE Protected_Route SHALL redirect ke /login
2. WHEN authenticated user dengan role 'admin' try access /member/*, THE Protected_Route SHALL redirect ke /guest
3. WHEN authenticated user dengan role 'member' access /member/*, THE Protected_Route SHALL render member dashboard
4. THE Protected_Route SHALL check allowedRoles=['member'] untuk semua member routes
5. THE System SHALL protect routes: /member, /member/orders, /member/profile
6. WHEN member access /member/orders, THE System SHALL only display orders yang terkait dengan user_id mereka (enforced by RLS)
7. THE System SHALL NOT allow member access admin CRUD operations
8. THE Member_User SHALL dapat view public guest pages (/guest/*) tanpa restrictions

### Requirement 7: Guest Access untuk Public Pages

**User Story:** Sebagai guest (unauthenticated user), saya ingin mengakses halaman publik website (home, products, about, contact, gallery), tanpa perlu login.

#### Acceptance Criteria

1. THE System SHALL allow unauthenticated access ke routes: /guest, /guest/products, /guest/about, /guest/contact, /guest/gallery
2. THE Guest_User SHALL dapat view product catalog tanpa login
3. THE Guest_User SHALL dapat view product detail pages
4. THE Guest_User SHALL dapat view about dan contact pages
5. THE Guest_User SHALL dapat view gallery
6. WHEN guest try access /admin/* atau /member/*, THE Protected_Route SHALL redirect ke /login
7. THE Guest routes SHALL NOT require Protected_Route wrapper
8. THE Navbar di GuestLayout SHALL show "Login" button untuk guest users

### Requirement 8: AuthContext Improvement

**User Story:** Sebagai developer, saya ingin AuthContext yang robust dan lengkap, sehingga authentication state management mudah digunakan di seluruh aplikasi.

#### Acceptance Criteria

1. THE Auth_Context SHALL provide values: { user, profile, loading, signOut, refreshProfile, supabase }
2. THE Auth_Context.user SHALL contain Supabase user object (id, email, metadata)
3. THE Auth_Context.profile SHALL contain profile object dari public.profiles (role, member_level, loyalty_points, full_name)
4. THE Auth_Context.loading SHALL be true during initial session fetch dan false setelah selesai
5. THE Auth_Context.signOut() SHALL be async function untuk logout user
6. THE Auth_Context.refreshProfile() SHALL re-fetch profile data dari database (untuk update points/tier)
7. THE Auth_Context SHALL NOT render children when loading === true (prevent flash of wrong content)
8. THE Auth_Context SHALL handle case dimana profile tidak ditemukan (user exist tapi profile missing)

### Requirement 9: Row Level Security (RLS) Enforcement

**User Story:** Sebagai system architect, saya ingin memastikan authorization di-enforce di database level melalui RLS policies, sehingga security tidak hanya bergantung pada frontend logic.

#### Acceptance Criteria

1. THE RLS_Policy pada public.profiles SHALL allow user read/update own profile atau admin read all profiles
2. THE RLS_Policy pada public.products SHALL allow public read, dan admin-only write operations
3. THE RLS_Policy pada public.customers SHALL allow admin full access, dan member view own customer record
4. THE RLS_Policy pada public.sales_orders SHALL allow admin full access, dan member view own orders
5. THE RLS_Policy pada public.order_items SHALL follow same pattern dengan sales_orders
6. THE Database SHALL reject unauthorized operations bahkan jika frontend bypass protection
7. THE RLS policies SHALL reference auth.uid() untuk identify current authenticated user
8. THE RLS policies SHALL check profile.role untuk determine admin vs member access

### Requirement 10: Sinkronisasi Role dengan Database

**User Story:** Sebagai admin, saya ingin role user disimpan dan dikelola di database (bukan hardcoded), sehingga role dapat diubah tanpa code changes.

#### Acceptance Criteria

1. THE Profile table SHALL store role field dengan values: 'admin' atau 'member'
2. THE Default role untuk user baru SHALL be 'member' (set by database trigger)
3. WHEN admin want promote user ke admin, THE Admin SHALL execute SQL: UPDATE profiles SET role='admin' WHERE id='user-id'
4. WHEN role di database berubah, THE System SHALL reflect perubahan setelah user logout/login atau call refreshProfile()
5. THE System SHALL NOT hardcode role di frontend code
6. THE System SHALL fetch role dari profile object yang di-load dari database
7. THE Protected_Route SHALL use profile.role untuk authorization checks
8. THE System SHALL NOT trust role claims dari JWT token saja, harus verify dengan database profile

### Requirement 11: UI/UX untuk Authentication

**User Story:** Sebagai user, saya ingin UI yang jelas dan responsif untuk proses login, register, dan logout, sehingga saya tahu status dari action saya.

#### Acceptance Criteria

1. THE Login page SHALL display error messages di atas form ketika login gagal
2. THE Register page SHALL display error messages di atas form ketika registration gagal
3. THE Login/Register button SHALL show "Loading..." text dan be disabled during API calls
4. WHEN session loading (Auth_Context.loading=true), THE Protected_Route SHALL show centered loading spinner
5. THE System SHALL NOT modify existing UI layout dan styling dari Login.jsx
6. THE System SHALL NOT modify existing UI components (Input, Button, etc)
7. THE Navbar/Header SHALL show user name dan logout button when authenticated
8. THE System SHALL maintain existing design aesthetic (cyan-400 theme)

### Requirement 12: Error Handling dan Edge Cases

**User Story:** Sebagai developer, saya ingin handle edge cases dan error scenarios dengan graceful, sehingga aplikasi tidak crash dan user mendapat feedback yang jelas.

#### Acceptance Criteria

1. WHEN profile fetch fail setelah login, THE System SHALL display error message dan allow retry
2. WHEN network offline during login, THE System SHALL display "Gagal terhubung ke server"
3. WHEN user's profile missing di database (orphaned user), THE System SHALL logout user dan redirect ke register
4. WHEN auth state change event fire multiple times, THE System SHALL debounce atau prevent duplicate profile fetches
5. THE System SHALL use try-catch blocks untuk handle unexpected errors
6. THE System SHALL log authentication errors ke console dengan clear labels (🔐, ❌, ✅)
7. WHEN token refresh fail, THE System SHALL gracefully logout user tanpa error modal
8. THE System SHALL handle case dimana user manually delete session dari browser storage

## Authentication Flow Diagram

### Login Flow
```
1. User open /login
2. User enter email + password
3. Submit form
   ├─ Call: supabase.auth.signInWithPassword()
   ├─ Success:
   │   ├─ Fetch profile from public.profiles
   │   ├─ Check profile.role
   │   ├─ If role='admin' → redirect /admin
   │   └─ If role='member' → redirect /member
   └─ Error:
       └─ Display error message
```

### Register Flow
```
1. User open /register
2. User enter full_name, email, password
3. Submit form
   ├─ Call: supabase.auth.signUp({ email, password, options: { data: { full_name } } })
   ├─ Trigger: handle_new_user() executes
   ├─ Database: INSERT INTO profiles (id, full_name, role='member')
   ├─ Success:
   │   ├─ Auto-login user
   │   └─ Redirect /member
   └─ Error:
       └─ Display error message
```

### Session Persistence Flow
```
1. User refresh browser
2. App mount → useEffect in AuthContext
3. Call: supabase.auth.getSession()
   ├─ Session found:
   │   ├─ Set user state
   │   ├─ Fetch profile from database
   │   ├─ Set profile state
   │   └─ Render protected content
   └─ No session:
       ├─ Set user=null, profile=null
       └─ Redirect to login if on protected route
```

### Logout Flow
```
1. User click "Logout" button
2. Call: supabase.auth.signOut()
3. Supabase clear session from storage
4. AuthContext set user=null, profile=null
5. Redirect to /guest
```

### Token Auto-Refresh Flow
```
1. Supabase monitor token expiration (background)
2. When token near expiry:
   ├─ Call refresh token endpoint
   ├─ Update session in storage
   ├─ Trigger onAuthStateChange listener
   └─ Continue user session seamlessly
3. If refresh fails:
   └─ Logout user
```

## Role-Based Access Matrix

| Route Pattern         | Admin | Member | Guest |
|-----------------------|-------|--------|-------|
| /guest/*              | ✅    | ✅     | ✅    |
| /login, /register     | ✅    | ✅     | ✅    |
| /admin/*              | ✅    | ❌     | ❌    |
| /member/*             | ❌    | ✅     | ❌    |

**Legend:**
- ✅ = Allowed
- ❌ = Redirect based on authentication state

**Redirect Logic:**
- Unauthenticated user → `/login`
- Wrong role → `/guest` (home)

## RLS Policy Design Summary

### public.profiles
```sql
-- Users can read/update own profile; admins read all
SELECT: auth.uid() = id OR (role='admin')
UPDATE: auth.uid() = id
INSERT: auth.uid() = id
```

### public.products
```sql
-- Public read; admin-only write
SELECT: true (public)
INSERT/UPDATE/DELETE: role='admin'
```

### public.customers
```sql
-- Admin full access; user can view own
SELECT: role='admin' OR user_id = auth.uid()
INSERT: true (guest checkout)
UPDATE/DELETE: role='admin'
```

### public.sales_orders
```sql
-- Admin full access; member view own orders
SELECT: role='admin' OR customer_id IN (SELECT id FROM customers WHERE user_id=auth.uid())
INSERT: true (anyone can create order)
UPDATE/DELETE: role='admin'
```

### public.order_items
```sql
-- Same pattern as sales_orders
SELECT: role='admin' OR order_id IN (SELECT id FROM sales_orders WHERE customer_id IN (...))
INSERT: true
UPDATE/DELETE: role='admin'
```

## File Structure

```
src/
├── contexts/
│   └── AuthContext.jsx           (✅ Update - improve session management)
├── components/
│   └── ProtectedRoute.jsx        (✅ Update - already correct, verify behavior)
├── pages/
│   └── auth/
│       ├── Login.jsx             (✅ Update - add role-based redirect)
│       ├── Register.jsx          (🔨 Create - implement register flow)
│       └── Forgot.jsx            (⏸ Out of scope - keep as placeholder)
└── App.jsx                       (✅ Verify - routes already setup correctly)
```

## AuthContext Implementation Checklist

### Current State (Already Implemented ✅)
- ✅ supabase.auth.getSession() on mount
- ✅ supabase.auth.onAuthStateChange() subscription
- ✅ fetchProfile() function
- ✅ signOut() function
- ✅ refreshProfile() function
- ✅ loading state management
- ✅ Conditional rendering {!loading && children}

### Required Updates (Improvements 🔨)
- 🔨 Add error handling untuk profile fetch failure
- 🔨 Add retry logic jika profile not found
- 🔨 Add console.log untuk debugging auth state changes
- 🔨 Handle case dimana user exists tapi profile missing
- 🔨 Add network error handling

## ProtectedRoute Implementation Checklist

### Current State (Already Implemented ✅)
- ✅ Check loading state → show spinner
- ✅ Check user → redirect to /login if not authenticated
- ✅ Check allowedRoles → redirect to /guest if wrong role
- ✅ Use <Navigate replace /> untuk prevent loop
- ✅ Return <Outlet /> untuk render child routes

### Required Updates (None ✓)
- ✓ Component sudah correct, hanya perlu testing

## Login.jsx Implementation Checklist

### Current State (Already Implemented ✅)
- ✅ Form dengan email + password fields
- ✅ supabase.auth.signInWithPassword() call
- ✅ Fetch profile setelah login
- ✅ Error handling dan display
- ✅ Loading state management

### Required Updates (Fix Redirect Logic 🔨)
- 🔨 Fix redirect logic: currently hardcoded role checks, perlu perbaikan
- 🔨 Add console logs untuk debugging
- 🔨 Ensure redirect happens via Navigate atau useNavigate, bukan manual location change

## Register.jsx Implementation (To Be Created 🔨)

### Required Features
- 🔨 Form: full_name, email, password, confirm_password
- 🔨 Call supabase.auth.signUp({ email, password, options: { data: { full_name } } })
- 🔨 Handle registration success → auto-login → redirect /member
- 🔨 Handle errors: email already used, password too short, network error
- 🔨 Loading state dan disabled button during submit
- 🔨 Link to /login untuk existing users

## Out of Scope

Fitur-fitur berikut **TIDAK TERMASUK** dalam requirement versi ini:

1. **Password Recovery/Reset**
   - Implement forgot password flow
   - Email verification untuk reset password
   - Magic link login

2. **Email Verification**
   - Require email verification sebelum login
   - Resend verification email

3. **Social Login**
   - Google OAuth
   - Facebook login
   - GitHub login

4. **Multi-Factor Authentication (MFA)**
   - SMS verification
   - Authenticator app

5. **Admin User Management UI**
   - Admin dashboard untuk manage users
   - UI untuk promote user ke admin
   - UI untuk ban/disable users

6. **Profile Management**
   - Edit profile page
   - Upload avatar
   - Change password form

7. **Session Management UI**
   - View active sessions
   - Logout from all devices
   - Session history

8. **Advanced Authorization**
   - Granular permissions (beyond admin/member)
   - Resource-level permissions
   - Dynamic permission system

9. **Audit Logging**
   - Log user login/logout events
   - Track authorization failures
   - Security event monitoring

10. **Rate Limiting**
    - Login attempt limits
    - Brute force protection
    - Account lockout mechanism

Fokus versi ini adalah: **Core authentication flow (login, register, logout), session persistence, dan role-based authorization** untuk 2 roles: Admin dan Member.

## Testing Checklist

### Manual Testing Scenarios

#### Login Flow
- [ ] Login dengan admin account → redirect ke /admin
- [ ] Login dengan member account → redirect ke /member
- [ ] Login dengan wrong password → show error message
- [ ] Login dengan non-existent email → show error message
- [ ] Login button disabled during loading

#### Register Flow
- [ ] Register new user → auto-create profile dengan role='member'
- [ ] Register → auto-login → redirect ke /member
- [ ] Register dengan email yang sudah ada → show error message
- [ ] Register dengan password < 6 char → show error message

#### Session Persistence
- [ ] Login → refresh browser → still logged in
- [ ] Login → close browser → open again → still logged in (if session valid)
- [ ] Token auto-refresh works (wait 50 minutes, check still logged in)

#### Logout Flow
- [ ] Click logout → redirect ke /guest
- [ ] After logout, try access /admin → redirect ke /login
- [ ] After logout, try access /member → redirect ke /login

#### Protected Routes - Admin
- [ ] Guest access /admin → redirect ke /login
- [ ] Member access /admin → redirect ke /guest
- [ ] Admin access /admin → render dashboard
- [ ] Admin can access: /admin/product, /admin/orders, /admin/customers

#### Protected Routes - Member
- [ ] Guest access /member → redirect ke /login
- [ ] Admin access /member → redirect ke /guest
- [ ] Member access /member → render member dashboard
- [ ] Member can access: /member/orders, /member/profile

#### Guest Access
- [ ] Guest can access /guest, /guest/products, /guest/about, /guest/contact, /guest/gallery
- [ ] Guest cannot access /admin or /member
- [ ] Authenticated users can still access guest pages

#### RLS Enforcement (Database Level)
- [ ] Member cannot read other members' orders (check Supabase console)
- [ ] Member cannot insert/update/delete products
- [ ] Guest cannot modify customers table
- [ ] Admin can read all tables

#### Edge Cases
- [ ] User with missing profile → handle gracefully
- [ ] Network error during login → show error message
- [ ] Manually delete session dari browser → logout dan redirect
- [ ] Rapid page navigation during loading → no race conditions

## Success Criteria

Fitur ini dianggap sukses jika:

1. ✅ User dapat login dengan email/password dan diarahkan ke dashboard sesuai role
2. ✅ User dapat register account baru dan profile auto-created di database
3. ✅ Session persist setelah browser refresh
4. ✅ Token auto-refresh bekerja tanpa user interaction
5. ✅ User dapat logout dan session ter-clear
6. ✅ Admin hanya bisa akses /admin/*, member hanya bisa akses /member/*
7. ✅ Guest bisa akses semua public pages tanpa login
8. ✅ RLS policies enforce authorization di database level
9. ✅ Role disimpan dan dikelola di database, bukan hardcoded
10. ✅ Error messages jelas dan helpful untuk user
11. ✅ Tidak ada UI changes pada existing components (sesuai BATASAN)
12. ✅ Tidak ada refactoring pada CRUD API yang sudah dibuat (sesuai BATASAN)
