# Microsoft Azure Login Test Plan for Orkla UAT

## Application Overview

This test plan covers the Microsoft Azure AD login page for the Orkla UAT2 Dynamics application. The application is a business management system that requires authentication via Microsoft's OAuth2 login flow. The test plan focuses on login functionality, error handling, account recovery, alternative sign-in options, and security features.

## Test Scenarios

### 1. Authentication - Primary Login Flow

**Seed:** `tests/seed.spec.ts`

#### 1.1. Successful login with valid credentials

**File:** `tests/authentication/login-valid.spec.ts`

**Steps:**
  1. Navigate to the Microsoft login page
  2. Enter a valid Orkla email address in the username field (e.g., user@orkla.biz)
  3. Click the Next button
  4. Wait for the password field to appear
  5. Enter a valid password
  6. Click the Next/Sign In button
  7. Wait for redirect to the Orkla dashboard
  8. Verify successful authentication and presence of dashboard elements

**Expected Results:**
  - Login form displays with username field focused
  - Username is accepted and Next button becomes active
  - Password field appears on the next screen
  - Password is accepted
  - User is redirected to https://orkla-uat2.sandbox.operations.dynamics.com
  - Dashboard loads with company information visible
  - User session is established with authentication cookies

#### 1.2. Login with empty username field

**File:** `tests/authentication/login-empty-username.spec.ts`

**Steps:**
  1. Navigate to the Microsoft login page
  2. Leave the username field empty
  3. Click the Next button
  4. Observe error handling
  5. Verify error message is displayed

**Expected Results:**
  - Next button is disabled or clicking has no effect
  - Error message appears indicating username is required
  - User remains on the login form
  - Form validation prevents submission

#### 1.3. Login with invalid username format

**File:** `tests/authentication/login-invalid-email.spec.ts`

**Steps:**
  1. Navigate to the Microsoft login page
  2. Enter an invalid email format (e.g., 'notanemail' without @)
  3. Click the Next button
  4. Observe error handling

**Expected Results:**
  - Error message displays indicating invalid email format
  - User is not proceeded to password screen
  - User remains on the login form

#### 1.4. Login with unregistered username

**File:** `tests/authentication/login-unregistered-user.spec.ts`

**Steps:**
  1. Navigate to the Microsoft login page
  2. Enter a valid email format that is not registered in the system (e.g., nonexistent@orkla.biz)
  3. Click the Next button
  4. Wait for server response

**Expected Results:**
  - Error message displays indicating user account not found
  - Server returns appropriate error response
  - User is not proceeded to password entry
  - User remains on the login form

### 2. Authentication - Password Entry and Validation

**Seed:** `tests/seed.spec.ts`

#### 2.1. Login with invalid password

**File:** `tests/authentication/login-invalid-password.spec.ts`

**Steps:**
  1. Navigate to the Microsoft login page
  2. Enter a valid registered username
  3. Click Next to proceed to password screen
  4. Enter an incorrect password
  5. Click Sign In button
  6. Wait for authentication response

**Expected Results:**
  - Error message displays: 'Invalid username or password' or similar
  - User is not authenticated
  - Session is not established
  - User remains on login page or password screen
  - Account is not locked (typically allows multiple attempts)

#### 2.2. Login with empty password field

**File:** `tests/authentication/login-empty-password.spec.ts`

**Steps:**
  1. Navigate to the Microsoft login page
  2. Enter a valid username and proceed to password screen
  3. Leave the password field empty
  4. Click the Sign In button

**Expected Results:**
  - Form validation triggers
  - Error message indicates password is required
  - Sign In button is disabled or no action occurs
  - User remains on password entry screen

#### 2.3. Login with password containing special characters

**File:** `tests/authentication/login-special-chars-password.spec.ts`

**Steps:**
  1. Navigate to the Microsoft login page
  2. Enter a valid username with special characters in the password field
  3. Click Sign In button
  4. Wait for authentication response

**Expected Results:**
  - Password field accepts special characters (!, @, #, $, %, etc.)
  - Authentication processes correctly if credentials are valid
  - No input validation errors for special characters

### 3. Authentication - Account Recovery and Help

**Seed:** `tests/seed.spec.ts`

#### 3.1. Navigate to account recovery for work account

**File:** `tests/authentication/account-recovery-work.spec.ts`

**Steps:**
  1. Navigate to the Microsoft login page
  2. Click 'Can\'t access your account?' link
  3. Select 'Work or school account' option
  4. Observe recovery flow options

**Expected Results:**
  - Account recovery page loads
  - Work or school account option is available
  - Recovery flow begins with appropriate instructions
  - User can proceed with account recovery process

#### 3.2. Navigate to account recovery for personal account

**File:** `tests/authentication/account-recovery-personal.spec.ts`

**Steps:**
  1. Navigate to the Microsoft login page
  2. Click 'Can\'t access your account?' link
  3. Select 'Personal account' option
  4. Observe recovery flow

**Expected Results:**
  - Personal account recovery option is available
  - Recovery flow begins with appropriate instructions
  - User can proceed with personal account recovery

#### 3.3. Navigate back from account recovery

**File:** `tests/authentication/account-recovery-back.spec.ts`

**Steps:**
  1. Navigate to the Microsoft login page
  2. Click 'Can\'t access your account?' link
  3. Click the Back button to return to login

**Expected Results:**
  - Back button is clickable
  - User is returned to the main login form
  - Username and password fields are cleared
  - Form state is reset

### 4. Authentication - Alternative Sign-In Methods

**Seed:** `tests/seed.spec.ts`

#### 4.1. Verify sign-in options button is available

**File:** `tests/authentication/signin-options-available.spec.ts`

**Steps:**
  1. Navigate to the Microsoft login page
  2. Verify the 'Sign-in options' button is visible
  3. Click the 'Sign-in options' button
  4. Verify available options are displayed

**Expected Results:**
  - Sign-in options button is visible and clickable
  - Dropdown or new page displays alternative sign-in methods
  - Biometric option: 'Face, fingerprint, PIN or security key' is shown
  - GitHub sign-in option is shown
  - Back button is available to return to main login

#### 4.2. Explore biometric sign-in option

**File:** `tests/authentication/signin-biometric.spec.ts`

**Steps:**
  1. Navigate to the Microsoft login page
  2. Click 'Sign-in options' button
  3. Verify the passkey/biometric option is displayed
  4. Observe option description
  5. Click back to main login

**Expected Results:**
  - Biometric option displays: 'Face, fingerprint, PIN or security key'
  - Description reads: 'Use your device to sign in with a passkey'
  - Learn more link is available for additional information
  - Option is clickable and configured
  - User can return to main login flow

#### 4.3. Explore GitHub sign-in option

**File:** `tests/authentication/signin-github.spec.ts`

**Steps:**
  1. Navigate to the Microsoft login page
  2. Click 'Sign-in options' button
  3. Verify GitHub sign-in option is available
  4. Observe option details

**Expected Results:**
  - GitHub sign-in option is displayed
  - Option is clickable
  - GitHub branding/logo is visible
  - User can interact with the GitHub option

### 5. UI/UX and Page Elements

**Seed:** `tests/seed.spec.ts`

#### 5.1. Verify page layout and branding

**File:** `tests/authentication/page-layout-branding.spec.ts`

**Steps:**
  1. Navigate to the Microsoft login page
  2. Verify background image is displayed
  3. Verify organization banner/logo is present
  4. Verify heading 'Sign in' is visible
  5. Verify all form elements are properly aligned

**Expected Results:**
  - Background image displays correctly
  - Organization logo/banner is visible at top
  - Page heading reads 'Sign in'
  - Form elements are centered and well-aligned
  - Page title in browser tab shows 'Sign in to your account'
  - No layout shift or rendering issues occur

#### 5.2. Verify footer links are accessible

**File:** `tests/authentication/footer-links.spec.ts`

**Steps:**
  1. Navigate to the Microsoft login page
  2. Scroll down to view footer
  3. Verify 'Terms of use' link is visible and clickable
  4. Verify 'Privacy & cookies' link is visible and clickable
  5. Verify troubleshooting information button is available

**Expected Results:**
  - Footer contains 'Terms of use' link
  - Footer contains 'Privacy & cookies' link
  - Troubleshooting button is available
  - All footer links point to correct Microsoft documentation URLs
  - Links open in appropriate target (new tab or same window)

#### 5.3. Verify input field placeholders and labels

**File:** `tests/authentication/input-field-labels.spec.ts`

**Steps:**
  1. Navigate to the Microsoft login page
  2. Check the username input field
  3. Verify placeholder text is displayed
  4. Focus on the username field
  5. Verify field styling changes on focus
  6. Verify field is accessible via keyboard navigation

**Expected Results:**
  - Username field shows placeholder: 'username@orkla.biz'
  - Field is properly labeled and accessible
  - Field styling changes (border color, shadow) on focus
  - Field can be reached using Tab key navigation
  - Screen readers can identify the field

#### 5.4. Verify Next button state changes

**File:** `tests/authentication/button-state-changes.spec.ts`

**Steps:**
  1. Navigate to the Microsoft login page
  2. Verify Next button is visible and enabled
  3. Clear username field (if pre-filled)
  4. Observe button state
  5. Enter a username
  6. Observe button state
  7. Click button and observe loading state

**Expected Results:**
  - Next button is enabled when form has content
  - Button may be disabled when form is empty (optional)
  - Button shows loading indicator when clicked
  - Button text may change to indicate processing
  - Button is not clickable during submission

### 6. Security and Session Management

**Seed:** `tests/seed.spec.ts`

#### 6.1. Verify HTTPS connection

**File:** `tests/authentication/https-connection.spec.ts`

**Steps:**
  1. Navigate to the Microsoft login page
  2. Check the page URL
  3. Verify protocol is HTTPS
  4. Check browser security indicator

**Expected Results:**
  - URL uses HTTPS protocol
  - No mixed content warnings
  - Browser shows secure connection indicator
  - Certificate is valid and trusted

#### 6.2. Verify session timeout handling

**File:** `tests/authentication/session-timeout.spec.ts`

**Steps:**
  1. Navigate to the Microsoft login page
  2. Enter username
  3. Wait for extended period (10+ minutes) without interaction
  4. Attempt to proceed with login

**Expected Results:**
  - Session may timeout after inactivity
  - User may be required to re-enter username
  - Appropriate error or message is displayed
  - User can retry login process

#### 6.3. Verify no sensitive data in URL

**File:** `tests/authentication/url-security.spec.ts`

**Steps:**
  1. Navigate to the Microsoft login page
  2. Enter username and proceed
  3. Check the browser URL throughout login process
  4. Verify sensitive information is not exposed in URL

**Expected Results:**
  - Username is not visible in the URL
  - Password is never visible in the URL
  - State parameters are properly encoded
  - OAuth2 tokens are not exposed in URL (should use POST)
  - Only safe parameters are visible in query string

#### 6.4. Verify password field masking

**File:** `tests/authentication/password-masking.spec.ts`

**Steps:**
  1. Navigate to the Microsoft login page
  2. Proceed to password entry screen
  3. Enter a password
  4. Verify password is masked/hidden
  5. Verify input type is password

**Expected Results:**
  - Password characters are masked (shown as dots/asterisks)
  - Password is not visible in plain text
  - Input field type is 'password'
  - Password is not logged or visible in browser console
  - Password is transmitted securely via HTTPS

### 7. Error Handling and Edge Cases

**Seed:** `tests/seed.spec.ts`

#### 7.1. Handle network error during login

**File:** `tests/authentication/network-error.spec.ts`

**Steps:**
  1. Navigate to the Microsoft login page
  2. Enter valid credentials
  3. Simulate network disconnection (use DevTools)
  4. Attempt to submit login form
  5. Wait for error response

**Expected Results:**
  - Error message is displayed to user
  - User is not left in undefined state
  - User can retry login after network is restored
  - Form data may be preserved for retry

#### 7.2. Handle very long username input

**File:** `tests/authentication/long-username-input.spec.ts`

**Steps:**
  1. Navigate to the Microsoft login page
  2. Enter a very long string of characters (500+ characters)
  3. Click Next button
  4. Observe field behavior

**Expected Results:**
  - Input field has maximum character limit
  - Field doesn't accept excessively long input
  - Form validation prevents submission of invalid data
  - UI handles long input gracefully without breaking layout

#### 7.3. Handle rapid consecutive login attempts

**File:** `tests/authentication/rapid-login-attempts.spec.ts`

**Steps:**
  1. Navigate to the Microsoft login page
  2. Enter credentials
  3. Click Submit button multiple times rapidly
  4. Observe rate limiting behavior

**Expected Results:**
  - Button is disabled after first click (no double submission)
  - Only one login request is processed
  - Loading state prevents multiple submissions
  - User receives appropriate feedback

#### 7.4. Handle account lockout after failed attempts

**File:** `tests/authentication/account-lockout.spec.ts`

**Steps:**
  1. Navigate to the Microsoft login page
  2. Enter correct username
  3. Enter wrong password multiple times (5+ attempts)
  4. Wait and observe account status

**Expected Results:**
  - After several failed attempts, account may be locked
  - Error message indicates account lockout
  - User is given option to unlock or recover account
  - Account recovery process is available
  - Lockout duration is communicated to user

### 8. Browser Compatibility and Accessibility

**Seed:** `tests/seed.spec.ts`

#### 8.1. Verify keyboard navigation

**File:** `tests/authentication/keyboard-navigation.spec.ts`

**Steps:**
  1. Navigate to the Microsoft login page
  2. Use Tab key to navigate through form elements
  3. Verify all interactive elements are reachable
  4. Use Enter key to submit form
  5. Verify focus indicators are visible

**Expected Results:**
  - All buttons and inputs are keyboard accessible
  - Tab order is logical (left to right, top to bottom)
  - Focus indicators are clearly visible
  - Enter key submits the form from any input field
  - Shift+Tab navigates backwards through elements

#### 8.2. Verify screen reader compatibility

**File:** `tests/authentication/screen-reader-compatibility.spec.ts`

**Steps:**
  1. Navigate to the Microsoft login page
  2. Inspect HTML structure for proper ARIA labels
  3. Verify form fields have associated labels
  4. Verify buttons have descriptive text
  5. Verify error messages are announced

**Expected Results:**
  - Input fields have aria-label or associated label elements
  - Buttons have accessible names
  - Headings use proper heading hierarchy (h1, h2, etc.)
  - Error messages are associated with form fields
  - Screen readers announce all important content

#### 8.3. Verify responsive design on mobile

**File:** `tests/authentication/mobile-responsive.spec.ts`

**Steps:**
  1. Navigate to the Microsoft login page
  2. Set viewport to mobile size (375x667)
  3. Verify form elements are visible and accessible
  4. Verify input fields are appropriately sized for touch
  5. Verify buttons are clickable without zooming
  6. Test form submission on mobile

**Expected Results:**
  - Layout is responsive on mobile viewports
  - Form elements stack vertically or adjust appropriately
  - Input fields are at least 44x44 pixels for touch
  - Text is readable without zooming
  - Keyboard opens and doesn't cover input fields excessively
  - Login flow works end-to-end on mobile

#### 8.4. Verify page load performance

**File:** `tests/authentication/page-load-performance.spec.ts`

**Steps:**
  1. Navigate to the Microsoft login page
  2. Measure page load time
  3. Check for render-blocking resources
  4. Verify time to interactive (TTI)
  5. Analyze network requests

**Expected Results:**
  - Page loads in under 3 seconds
  - Time to First Contentful Paint (FCP) is under 1.5 seconds
  - Time to Interactive (TTI) is under 3.5 seconds
  - No render-blocking resources (optional)
  - CSS and critical JS are optimized
  - No unnecessary requests or resources
