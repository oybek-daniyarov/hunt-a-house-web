## [Unreleased]

### Added

- Added support for Laravel paginated responses in the API client
- Added new `list<T>` method to LaravelClient for handling paginated endpoints
- Added `PaginatedResponse` and `PaginationLink` types to support Laravel's pagination structure
- Added support for filtering and sorting in list endpoints
- Added new types for filters and sort options (`Filter`, `SortOption`, `ListOptions`)
- Updated `getLeads` API method to support pagination parameters
- Added proper type imports from Laravel types in components
- Added endpoint-specific filter and sort configurations
- Added LeadFilterParams type for type-safe parameter handling
- Added dedicated lead filter and sort mapping configurations
- Added utility functions for building API filters and sorts
- Added support for Laravel's query parameter format

### Changed

- Modified `getLeads` to use the new `list` method instead of `get`
- Updated type imports in LaravelClient to include PaginatedResponse
- Refactored list method to accept a single options parameter
- Updated PropertyListingCard component to use Laravel API response types
- Aligned property names with Laravel API response format
- Improved activity type mapping to match backend values
- Removed unused interfaces and types from PropertyListingCard
- Updated activity type configuration to use Laravel enums
- Fixed API endpoint path in getLeads function
- Moved filter and sort logic to endpoint-specific modules
- Improved activity type conversion between URL and API formats
- Refactored lead API to use dedicated type and utility files
- Updated client's query string builder to match Laravel's format
- Improved filter parameter mapping with constants

### Technical Details

- The new pagination support matches Laravel's standard pagination response format
- Added proper typing for all pagination metadata including links, page numbers, and counts
- Default pagination shows 15 items per page but can be customized
- Maintains existing tag-based cache invalidation support
- Added support for complex filtering with multiple operators
- Added support for multi-column sorting
- Improved type safety with strict property name matching
- Enhanced null handling for optional fields
- Strengthened type safety by using Laravel's enum types
- Improved error handling with proper type assertions
- Separated concerns between filter building and API calls
- Added type-safe filter field mappings
- Improved maintainability with smaller, focused files
