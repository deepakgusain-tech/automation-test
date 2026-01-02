# Vendor List Page Test Plan

## Application Overview

The Vendor Table List Page in Orkla UAT2 Dynamics 365 Finance application is the central hub for managing vendor information. This page displays all vendors in a list format with filtering, sorting, and search capabilities. Users can view vendor details, create new vendors, edit existing vendors, and perform bulk operations. The page integrates with company selection (cmp=ov01) and navigates via the VendTableListPage menu item. Comprehensive testing covers UI functionality, data operations, filtering, validation, error handling, and user interactions.

## Test Scenarios

### 1. Authentication & Access

**Seed:** `tests/seed.spec.ts`

#### 1.1. User can access vendor list page when authenticated

**File:** `tests/vendor-management/vendor-list-access.spec.ts`

**Steps:**
  1. Navigate to Orkla UAT2 application home page
  2. Verify user is authenticated (logged in)
  3. Navigate to Vendor Table List Page (VendTableListPage menu item)
  4. Wait for page to fully load (network idle)
  5. Verify vendor list grid is displayed

**Expected Results:**
  - Page URL contains 'VendTableListPage'
  - Vendor list grid is visible and populated
  - No authentication error messages appear
  - Page loads without timeout errors

#### 1.2. Unauthenticated user is redirected to login

**File:** `tests/vendor-management/vendor-list-access.spec.ts`

**Steps:**
  1. Open a new browser session without stored session
  2. Navigate directly to VendTableListPage URL
  3. Observe the redirect behavior

**Expected Results:**
  - User is redirected to Microsoft login page
  - Vendor list page is not accessible without authentication

#### 1.3. Session expires and requires re-authentication

**File:** `tests/vendor-management/vendor-list-access.spec.ts`

**Steps:**
  1. Load vendor list page with valid session
  2. Simulate session expiration (modify or delete auth tokens)
  3. Interact with page elements
  4. Observe authentication challenge

**Expected Results:**
  - User is prompted to re-authenticate
  - Session expiration is handled gracefully
  - Appropriate error messages are displayed

### 2. Page Layout & UI Components

**Seed:** `tests/seed.spec.ts`

#### 2.1. All essential UI components are present

**File:** `tests/vendor-management/vendor-list-layout.spec.ts`

**Steps:**
  1. Navigate to vendor list page
  2. Verify page title displays 'Vendors' or similar
  3. Verify action buttons are visible (New, Edit, Delete, etc.)
  4. Verify filter/search bar is present
  5. Verify vendor list grid with columns is displayed
  6. Verify pagination or scrolling controls exist
  7. Verify status bar showing record count exists

**Expected Results:**
  - Page title is correct
  - All expected action buttons are present and enabled
  - Search/filter controls are functional
  - Vendor grid displays with correct columns
  - Pagination/scrolling controls are accessible
  - Status bar shows correct information

#### 2.2. Grid columns display correct vendor data

**File:** `tests/vendor-management/vendor-list-layout.spec.ts`

**Steps:**
  1. Navigate to vendor list page
  2. Identify all grid columns
  3. Verify columns include: Vendor Account, Vendor Name, Vendor Group, Payment Terms, Status, etc.
  4. Verify each column header is labeled correctly
  5. Verify data alignment (text left-aligned, numbers right-aligned)
  6. Verify column width is appropriate for content

**Expected Results:**
  - All expected columns are present
  - Column headers are correctly labeled
  - Data is properly aligned
  - Columns are appropriately sized
  - No truncated or hidden data

#### 2.3. Responsive layout works on different screen sizes

**File:** `tests/vendor-management/vendor-list-layout.spec.ts`

**Steps:**
  1. Load vendor list page at desktop resolution (1920x1080)
  2. Verify layout is optimized for desktop
  3. Resize browser to tablet size (768x1024)
  4. Verify layout adapts appropriately
  5. Resize browser to mobile size (375x667)
  6. Verify layout is readable on mobile
  7. Verify horizontal scroll exists for mobile if needed

**Expected Results:**
  - Desktop layout displays all content clearly
  - Tablet view collapses non-essential columns
  - Mobile view remains usable with essential information
  - No overlapping elements
  - All controls remain accessible

### 3. Vendor Data Display & Sorting

**Seed:** `tests/seed.spec.ts`

#### 3.1. Vendor list displays correct data from database

**File:** `tests/vendor-management/vendor-list-data.spec.ts`

**Steps:**
  1. Navigate to vendor list page
  2. Wait for page to fully load
  3. Identify first vendor record in list
  4. Verify vendor account number format is correct
  5. Verify vendor name is properly displayed
  6. Verify vendor group is populated (if applicable)
  7. Verify other vendor attributes match database

**Expected Results:**
  - All vendor records load correctly
  - Vendor data matches database
  - No data corruption or encoding issues
  - All expected fields are populated
  - Date fields display in correct format

#### 3.2. Sorting by vendor account works correctly

**File:** `tests/vendor-management/vendor-list-data.spec.ts`

**Steps:**
  1. Navigate to vendor list page
  2. Click on 'Vendor Account' column header
  3. Verify list sorts in ascending order
  4. Click column header again
  5. Verify list sorts in descending order
  6. Verify sort indicator (arrow) is visible
  7. Click another column to change sort
  8. Verify previous sort is cleared

**Expected Results:**
  - Column sorts in both ascending and descending order
  - Sort order is correct (A-Z or 0-9)
  - Sort indicator is visible
  - Only one column is sorted at a time
  - Sort persists as user navigates

#### 3.3. Sorting by vendor name works correctly

**File:** `tests/vendor-management/vendor-list-data.spec.ts`

**Steps:**
  1. Navigate to vendor list page
  2. Click on 'Vendor Name' column header
  3. Verify list sorts alphabetically
  4. Click column header again
  5. Verify reverse alphabetical sort
  6. Verify special characters are handled correctly

**Expected Results:**
  - Vendor names sort alphabetically (A-Z)
  - Reverse sort works (Z-A)
  - Sort is case-insensitive
  - Special characters are handled correctly

#### 3.4. Sorting by status/other columns works correctly

**File:** `tests/vendor-management/vendor-list-data.spec.ts`

**Steps:**
  1. Navigate to vendor list page
  2. Click sortable columns (Status, Payment Terms, etc.)
  3. Verify each column sorts correctly
  4. Verify multiple sort columns can be applied (if supported)

**Expected Results:**
  - All sortable columns sort correctly
  - Sort order is logical for each data type
  - Multi-column sort works if supported

#### 3.5. Pagination displays correct record range

**File:** `tests/vendor-management/vendor-list-data.spec.ts`

**Steps:**
  1. Navigate to vendor list page
  2. Verify pagination controls are present
  3. Verify page size dropdown shows current records per page
  4. Click 'Next' or page navigation button
  5. Verify different set of vendors loads
  6. Verify page indicator updates
  7. Navigate to last page
  8. Verify remaining records are displayed

**Expected Results:**
  - Pagination displays correct record ranges
  - Page navigation works forward and backward
  - Record count is accurate
  - Page indicator updates correctly
  - Last page shows remaining records

### 4. Search & Filter Functionality

**Seed:** `tests/seed.spec.ts`

#### 4.1. Basic search by vendor account number

**File:** `tests/vendor-management/vendor-list-search.spec.ts`

**Steps:**
  1. Navigate to vendor list page
  2. Locate search/filter input field
  3. Enter a known vendor account number (e.g., 'VEND001')
  4. Press Enter or click Search button
  5. Wait for results to load
  6. Verify only matching vendor is displayed

**Expected Results:**
  - Search executes without errors
  - Results are filtered to matching vendor
  - Result count updates appropriately
  - Vendor account number matches search term exactly

#### 4.2. Search by vendor name

**File:** `tests/vendor-management/vendor-list-search.spec.ts`

**Steps:**
  1. Navigate to vendor list page
  2. Enter vendor name in search field (e.g., 'Acme')
  3. Press Enter or click Search button
  4. Wait for results
  5. Verify vendors with matching names are displayed

**Expected Results:**
  - Search matches vendor names correctly
  - Partial matches are included (if applicable)
  - Case-insensitive search works
  - Multiple vendors with same name are all shown

#### 4.3. Search with no results displays message

**File:** `tests/vendor-management/vendor-list-search.spec.ts`

**Steps:**
  1. Navigate to vendor list page
  2. Enter a non-existent vendor account (e.g., 'NONEXISTENT999')
  3. Press Enter to search
  4. Observe response

**Expected Results:**
  - 'No records found' message displays
  - Grid is empty or hidden
  - User is informed search had no matches
  - Option to clear search is available

#### 4.4. Clear search button resets filter

**File:** `tests/vendor-management/vendor-list-search.spec.ts`

**Steps:**
  1. Perform a search that returns results
  2. Click 'Clear', 'Reset', or X button next to search
  3. Verify search field is cleared
  4. Verify full vendor list is displayed again

**Expected Results:**
  - Search field is emptied
  - All vendors are displayed
  - Filter state is reset
  - Page returns to initial state

#### 4.5. Advanced filter by vendor status

**File:** `tests/vendor-management/vendor-list-search.spec.ts`

**Steps:**
  1. Navigate to vendor list page
  2. Locate status filter (if available)
  3. Select 'Active' status
  4. Verify list updates to show only active vendors
  5. Change filter to 'Blocked'
  6. Verify list updates to show blocked vendors
  7. Clear filter
  8. Verify all vendors are shown again

**Expected Results:**
  - Status filter is available
  - Filter updates list correctly
  - Only vendors with selected status appear
  - Filter can be cleared
  - Filter persists when navigating pages

#### 4.6. Advanced filter by vendor group

**File:** `tests/vendor-management/vendor-list-search.spec.ts`

**Steps:**
  1. Navigate to vendor list page
  2. Locate vendor group filter dropdown
  3. Select a specific vendor group (e.g., 'Suppliers')
  4. Verify list filters to selected group
  5. Select multiple groups (if multi-select available)
  6. Verify filtering works for multiple selections

**Expected Results:**
  - Vendor group filter is present and functional
  - List filters correctly by group
  - Single and multi-select filters work
  - No vendors outside selected group appear

#### 4.7. Multiple filters work together

**File:** `tests/vendor-management/vendor-list-search.spec.ts`

**Steps:**
  1. Navigate to vendor list page
  2. Apply status filter (e.g., 'Active')
  3. Apply vendor group filter (e.g., 'Suppliers')
  4. Apply search term (partial vendor name)
  5. Verify results match all criteria

**Expected Results:**
  - Multiple filters can be applied simultaneously
  - Results match all applied filters
  - Filter logic is AND (not OR)
  - Filters don't conflict with each other

### 5. Vendor CRUD Operations

**Seed:** `tests/seed.spec.ts`

#### 5.1. User can create new vendor from list page

**File:** `tests/vendor-management/vendor-list-crud.spec.ts`

**Steps:**
  1. Navigate to vendor list page
  2. Click 'New' or 'Add Vendor' button
  3. Verify vendor form opens (modal or new page)
  4. Fill in required fields (Account, Name, Group, etc.)
  5. Click 'Save' button
  6. Verify form closes and new vendor appears in list
  7. Verify success message is displayed

**Expected Results:**
  - New vendor form is accessible
  - All required fields can be filled
  - Vendor is successfully created
  - New vendor appears in the list
  - Success confirmation is shown
  - Vendor account number is generated (if auto)

#### 5.2. Required fields validation on new vendor

**File:** `tests/vendor-management/vendor-list-crud.spec.ts`

**Steps:**
  1. Click 'New' button to create vendor
  2. Leave required fields empty
  3. Click 'Save' button
  4. Observe validation errors

**Expected Results:**
  - Validation error appears for each empty required field
  - Form is not submitted
  - Error messages are clear and specific
  - User can identify which fields need data

#### 5.3. User can edit existing vendor

**File:** `tests/vendor-management/vendor-list-crud.spec.ts`

**Steps:**
  1. Navigate to vendor list page
  2. Click on a vendor record to select it
  3. Click 'Edit' button or double-click the vendor
  4. Verify vendor detail form opens
  5. Modify a field (e.g., vendor name, payment terms)
  6. Click 'Save' button
  7. Verify form closes and change is reflected in list

**Expected Results:**
  - Vendor can be opened for editing
  - All fields are editable (where permitted)
  - Changes are saved successfully
  - List is updated with new values
  - Edit confirmation is shown

#### 5.4. User can delete vendor

**File:** `tests/vendor-management/vendor-list-crud.spec.ts`

**Steps:**
  1. Navigate to vendor list page
  2. Select a vendor record
  3. Click 'Delete' button
  4. Verify confirmation dialog appears
  5. Click 'Yes' or 'Confirm' in dialog
  6. Verify vendor is removed from list
  7. Verify success message is displayed

**Expected Results:**
  - Delete action shows confirmation dialog
  - User cannot delete without confirming
  - Vendor is successfully deleted
  - Vendor disappears from list
  - Success message is displayed

#### 5.5. Deletion can be cancelled

**File:** `tests/vendor-management/vendor-list-crud.spec.ts`

**Steps:**
  1. Navigate to vendor list page
  2. Select a vendor record
  3. Click 'Delete' button
  4. Verify confirmation dialog
  5. Click 'No' or 'Cancel' in dialog
  6. Verify vendor remains in list unchanged

**Expected Results:**
  - Deletion is cancelled
  - Vendor remains in list
  - No error or warning messages appear

#### 5.6. Bulk delete multiple vendors

**File:** `tests/vendor-management/vendor-list-crud.spec.ts`

**Steps:**
  1. Navigate to vendor list page
  2. Select multiple vendors (using checkboxes or multi-select)
  3. Click bulk 'Delete' button (if available)
  4. Verify confirmation shows number of vendors to delete
  5. Confirm deletion
  6. Verify all selected vendors are removed

**Expected Results:**
  - Multiple vendors can be selected
  - Bulk delete option is available
  - Confirmation shows correct count
  - All selected vendors are deleted
  - List updates immediately

### 6. Vendor Detail Navigation

**Seed:** `tests/seed.spec.ts`

#### 6.1. Clicking vendor opens detail page

**File:** `tests/vendor-management/vendor-list-navigation.spec.ts`

**Steps:**
  1. Navigate to vendor list page
  2. Click on a vendor account number or name
  3. Wait for vendor detail page to load
  4. Verify vendor account is highlighted in URL or page
  5. Verify all vendor details are displayed

**Expected Results:**
  - Vendor detail page loads successfully
  - Correct vendor information is displayed
  - Page title shows vendor account
  - URL contains vendor reference
  - All vendor tabs/sections are accessible

#### 6.2. User can navigate back to list from detail page

**File:** `tests/vendor-management/vendor-list-navigation.spec.ts`

**Steps:**
  1. Open vendor detail page from list
  2. Click 'Back' or 'Return to List' button
  3. Verify list page loads
  4. Verify previously applied filters/search still apply

**Expected Results:**
  - Back navigation works correctly
  - List page is displayed
  - Previous filter state is preserved
  - User's position in list is maintained (if possible)

#### 6.3. Double-click vendor row opens detail page

**File:** `tests/vendor-management/vendor-list-navigation.spec.ts`

**Steps:**
  1. Navigate to vendor list page
  2. Double-click a vendor row
  3. Verify vendor detail page opens

**Expected Results:**
  - Double-click opens vendor detail
  - Detail page loads with correct vendor
  - No error or lag in response

### 7. Status & Actions

**Seed:** `tests/seed.spec.ts`

#### 7.1. Vendor status is correctly displayed

**File:** `tests/vendor-management/vendor-list-status.spec.ts`

**Steps:**
  1. Navigate to vendor list page
  2. Identify status column
  3. Verify active vendors show 'Active' status
  4. Verify blocked vendors show 'Blocked' status
  5. Verify pending vendors show appropriate status
  6. Verify status indicators (colors, icons) are consistent

**Expected Results:**
  - Status column displays correct values
  - All vendor statuses are accurate
  - Status visual indicators are consistent
  - Status filtering matches displayed status

#### 7.2. User can block/unblock vendor from list

**File:** `tests/vendor-management/vendor-list-status.spec.ts`

**Steps:**
  1. Navigate to vendor list page
  2. Right-click on vendor row (context menu)
  3. Select 'Block Vendor' or similar option
  4. Verify confirmation dialog
  5. Confirm action
  6. Verify vendor status changes to 'Blocked'
  7. Right-click again and select 'Unblock'
  8. Verify status returns to 'Active'

**Expected Results:**
  - Context menu appears on right-click
  - Block/Unblock option is available
  - Vendor status updates immediately
  - Change is persisted
  - Visual indicator updates

#### 7.3. Action buttons enable/disable based on selection

**File:** `tests/vendor-management/vendor-list-status.spec.ts`

**Steps:**
  1. Navigate to vendor list page
  2. Verify action buttons are enabled when vendor is selected
  3. Click empty area to deselect
  4. Verify action buttons are disabled
  5. Select multiple vendors
  6. Verify bulk action buttons are enabled

**Expected Results:**
  - Buttons are disabled when no selection
  - Buttons are enabled when vendor selected
  - Bulk buttons appear when multiple selected
  - Disabled buttons show visual indication

### 8. Performance & Load Testing

**Seed:** `tests/seed.spec.ts`

#### 8.1. Page loads within acceptable time

**File:** `tests/vendor-management/vendor-list-performance.spec.ts`

**Steps:**
  1. Navigate to vendor list page
  2. Measure page load time
  3. Verify page is fully interactive within 3 seconds
  4. Verify grid loads and displays within 5 seconds

**Expected Results:**
  - Page loads in under 3 seconds (interactive)
  - Grid renders in under 5 seconds
  - No timeout errors
  - Page is responsive to user input

#### 8.2. Large dataset pagination is performant

**File:** `tests/vendor-management/vendor-list-performance.spec.ts`

**Steps:**
  1. Navigate to vendor list page
  2. Verify page size options (e.g., 10, 25, 50, 100 records)
  3. Select page size of 100 records
  4. Measure time to load 100 records
  5. Navigate to page 2
  6. Verify navigation time is reasonable
  7. Scroll through large result set

**Expected Results:**
  - Large page sizes load within 5-10 seconds
  - Pagination is smooth and responsive
  - No lag or freezing when scrolling
  - Memory usage is acceptable

#### 8.3. Search on large dataset completes in reasonable time

**File:** `tests/vendor-management/vendor-list-performance.spec.ts`

**Steps:**
  1. Navigate to vendor list with many records
  2. Enter search term
  3. Measure search execution time
  4. Verify results appear within 2-3 seconds

**Expected Results:**
  - Search completes within 2-3 seconds
  - Results are accurate
  - No timeout errors
  - UI remains responsive

### 9. Error Handling & Edge Cases

**Seed:** `tests/seed.spec.ts`

#### 9.1. Network error is handled gracefully

**File:** `tests/vendor-management/vendor-list-errors.spec.ts`

**Steps:**
  1. Navigate to vendor list page
  2. Simulate network disconnection (DevTools)
  3. Try to refresh the page or perform action
  4. Observe error handling

**Expected Results:**
  - User-friendly error message appears
  - Retry option is available
  - Page doesn't crash
  - No JavaScript errors in console

#### 9.2. Server error (500) is handled gracefully

**File:** `tests/vendor-management/vendor-list-errors.spec.ts`

**Steps:**
  1. Navigate to vendor list page
  2. Mock server to return 500 error
  3. Trigger action that calls backend
  4. Observe error handling

**Expected Results:**
  - Error message informs user of problem
  - Page is still usable
  - Retry or navigation option is available
  - No unhandled errors in console

#### 9.3. Vendor with special characters displays correctly

**File:** `tests/vendor-management/vendor-list-errors.spec.ts`

**Steps:**
  1. Search for vendor with special characters in name (e.g., 'Café', 'Müller')
  2. Verify vendor displays correctly
  3. Verify search matches correctly
  4. Create vendor with special characters
  5. Verify special characters are saved and displayed

**Expected Results:**
  - Special characters display correctly
  - Special characters don't break formatting
  - Search works with special characters
  - Data is not corrupted

#### 9.4. Concurrent edit conflict handling

**File:** `tests/vendor-management/vendor-list-errors.spec.ts`

**Steps:**
  1. User A opens vendor for editing
  2. User B opens same vendor for editing
  3. User A saves changes
  4. User B tries to save
  5. Observe conflict handling

**Expected Results:**
  - User B receives conflict warning
  - User B can view User A's changes
  - User B can merge changes or cancel
  - No data loss occurs
  - Appropriate message explains situation

#### 9.5. Missing mandatory data is handled

**File:** `tests/vendor-management/vendor-list-errors.spec.ts`

**Steps:**
  1. Verify vendor records without payment terms
  2. Verify vendor records without group
  3. Verify how incomplete data displays in list

**Expected Results:**
  - Incomplete data displays with clear indication
  - Dashes or 'N/A' shown for missing data
  - No errors or truncation
  - List remains sortable and filterable

### 10. Accessibility & User Experience

**Seed:** `tests/seed.spec.ts`

#### 10.1. Keyboard navigation is fully functional

**File:** `tests/vendor-management/vendor-list-accessibility.spec.ts`

**Steps:**
  1. Navigate to vendor list page
  2. Use Tab key to navigate through all controls
  3. Verify focus is visible on each element
  4. Use keyboard to activate buttons and links
  5. Navigate grid using arrow keys
  6. Select vendors using Space key
  7. Use Enter to open vendor details

**Expected Results:**
  - All controls are keyboard accessible
  - Focus indicator is visible
  - Tab order is logical
  - No focus traps
  - Keyboard shortcuts work as expected

#### 10.2. Page has proper heading hierarchy

**File:** `tests/vendor-management/vendor-list-accessibility.spec.ts`

**Steps:**
  1. Navigate to vendor list page
  2. Inspect page heading structure
  3. Verify H1 for page title exists
  4. Verify other headings follow proper hierarchy
  5. Verify no heading levels are skipped

**Expected Results:**
  - Page has one H1 heading
  - Heading hierarchy is proper (H1, H2, H3...)
  - All sections have descriptive headings
  - No heading levels are skipped

#### 10.3. Form labels are associated with inputs

**File:** `tests/vendor-management/vendor-list-accessibility.spec.ts`

**Steps:**
  1. Navigate to vendor list page
  2. Inspect filter/search inputs
  3. Verify each input has associated label
  4. Click label and verify input receives focus

**Expected Results:**
  - All inputs have associated labels
  - Labels are properly linked (for attribute)
  - Clicking label focuses input
  - Screen readers announce label with input

#### 10.4. Color contrast meets WCAG standards

**File:** `tests/vendor-management/vendor-list-accessibility.spec.ts`

**Steps:**
  1. Navigate to vendor list page
  2. Use contrast checker tool
  3. Check text vs background contrast
  4. Check button text contrast
  5. Check status indicator contrast

**Expected Results:**
  - All text has contrast ratio >= 4.5:1
  - Large text has contrast ratio >= 3:1
  - Buttons have sufficient contrast
  - Status indicators are not color-only

#### 10.5. Screen reader announces content correctly

**File:** `tests/vendor-management/vendor-list-accessibility.spec.ts`

**Steps:**
  1. Navigate to vendor list with screen reader enabled
  2. Listen to page title and structure announcement
  3. Navigate through grid rows
  4. Verify each row is announced with context
  5. Navigate to filter buttons
  6. Verify button purpose is clear

**Expected Results:**
  - Page title is announced
  - Grid structure is understandable
  - Row data is announced in logical order
  - Buttons are identified with purpose
  - No confusing or redundant announcements

### 11. Data Integrity & Security

**Seed:** `tests/seed.spec.ts`

#### 11.1. Vendor data cannot be modified by unauthorized user

**File:** `tests/vendor-management/vendor-list-security.spec.ts`

**Steps:**
  1. Log in as user without edit permissions
  2. Navigate to vendor list page
  3. Verify Edit and Delete buttons are disabled/hidden
  4. Attempt to edit vendor via direct URL
  5. Verify action is denied with permission error

**Expected Results:**
  - Edit/Delete buttons are disabled for unauthorized users
  - Buttons are grayed out or hidden
  - Direct URL editing is blocked
  - Permission error is displayed
  - Data remains unchanged

#### 11.2. Sensitive vendor data is masked appropriately

**File:** `tests/vendor-management/vendor-list-security.spec.ts`

**Steps:**
  1. Navigate to vendor list page
  2. Verify bank account numbers are masked (if displayed)
  3. Verify tax IDs are masked (if displayed)
  4. Verify sensitive data is only shown to authorized users

**Expected Results:**
  - Sensitive data is not fully visible
  - Masking shows partial value (e.g., ****1234)
  - Full data only visible to authorized users
  - No security data in page source

#### 11.3. Audit trail of changes is logged

**File:** `tests/vendor-management/vendor-list-security.spec.ts`

**Steps:**
  1. Edit a vendor record
  2. Save changes
  3. Navigate to audit log or change history
  4. Verify change is recorded with timestamp
  5. Verify user who made change is identified
  6. Verify old and new values are logged

**Expected Results:**
  - All changes are logged
  - Audit log shows timestamp
  - User identity is recorded
  - Before and after values are stored
  - Audit log is immutable
