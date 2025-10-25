# P&C Insurance Coverage Gap Identifier - Design Guidelines

## Design Approach

**Selected Framework**: Material Design 3
**Rationale**: Professional insurance analysis tools require clear data hierarchy, established interaction patterns, and trustworthy aesthetics. Material Design provides robust components for forms, data visualization, and dashboard layouts that inspire confidence in financial/insurance contexts.

**Design Philosophy**: Blend the clarity of enterprise dashboards (like Salesforce) with the approachable efficiency of modern fintech tools (like Stripe Dashboard). Prioritize information density without overwhelming users, using progressive disclosure for complex policy details.

---

## Typography System

**Font Family**: 
- Primary: Inter or Roboto (via Google Fonts)
- Monospace: Roboto Mono for policy numbers and monetary values

**Type Scale**:
- Hero/Dashboard Title: 32px (2rem), font-weight 600
- Section Headers: 24px (1.5rem), font-weight 600
- Card Titles: 18px (1.125rem), font-weight 500
- Body Text: 16px (1rem), font-weight 400
- Caption/Labels: 14px (0.875rem), font-weight 400
- Small Text/Metadata: 12px (0.75rem), font-weight 400

**Hierarchy Rules**:
- Policy input labels: 14px medium weight
- Coverage amounts: 18px semibold for emphasis
- Gap warnings: 16px medium with icon pairing
- Recommendations: 14px regular with increased line-height (1.6)

---

## Layout System

**Spacing Primitives**: Tailwind units of 2, 4, 6, 8, 12, 16
- Component padding: p-6 or p-8
- Section spacing: gap-8 or gap-12
- Form field spacing: gap-4 or gap-6
- Card margins: m-4 or m-6

**Grid Structure**:
- Main dashboard: Two-column layout (input form 40% | results 60%)
- Mobile: Single column, stacked flow
- Card grids: 2-column on desktop, single on mobile
- Gap analysis cards: 3-column grid for coverage categories

**Container Widths**:
- Max application width: max-w-7xl
- Form containers: max-w-2xl
- Card content: Fluid within grid constraints

---

## Core Components

### Navigation Header
- Sticky top navigation with app logo/title
- Breadcrumb trail showing analysis progress
- Action buttons: "New Analysis" and "Export Report"
- User profile/settings icon (right-aligned)
- Height: 64px (h-16)

### Policy Input Form (Left Panel)
Multi-step accordion or tabbed form structure:

**Section 1: Property Information**
- Address input with autocomplete
- Property type dropdown (Single Family, Condo, Rental, etc.)
- Construction year, square footage, replacement cost
- Radio buttons for property features (pool, detached structures, etc.)

**Section 2: Current Coverage Details**
- Dwelling coverage amount (currency input with formatting)
- Personal property coverage input
- Liability limit selector
- Deductible amount dropdown
- Additional coverages (flood, earthquake) with toggle switches
- Loss of use/ALE coverage input

**Section 3: Additional Context**
- Number of claims in last 5 years (number input)
- Mortgage/lien information (yes/no with conditional input)
- High-value items declaration (optional expandable section)

Form Design Patterns:
- Group related fields in cards with subtle borders
- Use Material text fields with floating labels
- Validation messages appear inline below fields
- Progress indicator showing form completion percentage
- "Analyze Coverage" primary button (elevated, full-width at bottom)

### Results Dashboard (Right Panel/Full Screen on Mobile)

**Coverage Assessment Summary Card**
- Large status indicator: "Adequate Coverage" / "Gaps Identified" / "Critical Gaps"
- Overall risk score (visual gauge or progress ring: 0-100)
- Quick stats grid: Total coverage, Premium estimate, Risk level
- "Generate PDF Report" secondary button

**Coverage Categories Grid** (3 columns)
Each category card displays:
- Category icon (dwelling, liability, personal property, loss of use)
- Current coverage amount (large, prominent)
- Recommended minimum (if gap exists)
- Status badge (Adequate/Insufficient/Missing)
- Gap amount highlighted prominently
- Expandable detail section with reasoning

**Detailed Gap Analysis Section**
Expandable cards for each identified gap:
- Gap severity indicator (Critical/Moderate/Low)
- Specific deficiency explanation in plain language
- Financial risk scenario example
- Recommended coverage amount with justification
- "Why this matters" educational tooltip

**Risk Scenarios Visualization**
- Horizontal comparison bars showing coverage vs. potential loss
- Common disaster scenarios (fire, water damage, liability claim)
- Coverage sufficiency percentage for each scenario

### Data Visualization Components

**Coverage Adequacy Gauge**
- Circular progress indicator (0-100%)
- Center number showing percentage
- Segments colored to indicate risk levels

**Gap Severity Indicators**
- Critical: Large warning icon with exclamation
- Moderate: Alert icon
- Low: Info icon
- Each with distinct visual treatment

**Comparison Bars**
- Horizontal stacked bars comparing current vs. recommended coverage
- Clear labeling of amounts
- Visual gap representation

---

## Interaction Patterns

**Form Validation**:
- Real-time validation on blur for critical fields
- Helper text appearing below inputs
- Error states with descriptive messages
- Success states with checkmark icons

**Progressive Disclosure**:
- Collapsible sections for less critical information
- "Show more details" links for gap explanations
- Tooltips for insurance terminology
- Expandable educational content panels

**Responsive Behavior**:
- Desktop: Side-by-side form and results
- Tablet: Stacked with sticky header navigation
- Mobile: Full-screen form, then full-screen results (wizard-style flow)

**Loading States**:
- Analysis in progress: Progress spinner with "Analyzing coverage..." text
- Skeleton screens for dashboard cards while loading
- Smooth transitions between states

---

## Accessibility Standards

- ARIA labels on all form inputs
- Keyboard navigation for entire form flow
- Focus indicators on all interactive elements (2px outline with 4px offset)
- Screen reader announcements for validation messages
- Sufficient contrast ratios (WCAG AA minimum)
- Labels always visible (not placeholder-only)
- Error messages programmatically associated with inputs

---

## Imagery

**Hero Section**: None - This is a utility application that prioritizes immediate access to functionality

**Supporting Images**:
- **Educational Icons**: Use Material Icons for coverage categories (home, shield, umbrella, medical cross, car)
- **Illustration Spots**: Consider simple line illustrations for empty states ("No analysis yet" with clipboard icon)
- **Risk Scenario Icons**: Visual representations of common disasters (small, tasteful icons)

All icons should be line-style, maintaining visual consistency throughout the application.

---

## Component Specifications

**Buttons**:
- Primary: Elevated style, 44px height, 16px horizontal padding, semibold text
- Secondary: Outlined style, same dimensions
- Text buttons: No background, maintain touch target size
- Icon buttons: 40px x 40px minimum

**Cards**:
- Elevated with subtle shadow
- 16px padding (p-4 on mobile, p-6 on desktop)
- 8px border radius
- Clear header with 20px bottom margin from content

**Form Fields**:
- Material outlined text fields (56px height)
- 16px padding, 4px border radius
- Labels: 14px, positioned above field
- Helper text: 12px below field
- 24px spacing between fields

**Badges/Chips**:
- Status badges: 8px vertical padding, 12px horizontal padding
- Rounded corners (fully rounded: rounded-full)
- 12px text size, medium weight
- Icons at 16px size when paired with text

**Modals/Dialogs**:
- Maximum width: 600px
- 24px padding
- Actions aligned to bottom-right
- Backdrop overlay with 40% opacity

---

## Animation Guidelines

**Use Sparingly**:
- Micro-interactions on form field focus (subtle scale or highlight)
- Card elevation change on hover (2px to 4px shadow)
- Smooth transitions for accordion/expansion (200ms ease)
- Results appearing with subtle fade-in (300ms)

**Avoid**:
- Loading animations beyond simple spinners
- Complex scroll-triggered effects
- Decorative animations that distract from data analysis
- Excessive transitions between states

---

## Mobile Optimization

- Touch targets minimum 44px x 44px
- Form fields full-width on mobile
- Bottom sheet pattern for detailed gap information
- Sticky "Analyze Coverage" button at bottom
- Swipeable cards for coverage categories
- Collapsible sections default to closed on mobile
- Single-column layouts throughout