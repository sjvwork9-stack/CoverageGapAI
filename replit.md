# P&C Insurance Coverage Gap Analyzer

## Overview
A professional Property & Casualty (P&C) insurance coverage gap analysis tool that helps users identify inadequate coverage areas in their insurance policies. The application accepts policy details as input and provides comprehensive analysis with actionable recommendations based on industry standards.

## Project Status
✅ MVP Complete - Fully functional application with end-to-end testing verified

## Features Implemented

### Policy Input System
- Multi-section accordion form for organized data entry
- Property information capture (address, type, construction year, square footage, replacement cost)
- Current coverage details (dwelling, personal property, liability, deductible, loss of use)
- Additional coverage options (flood, earthquake insurance toggles)
- Claims history and mortgage status tracking
- Form validation with real-time feedback

### Coverage Analysis Engine
- Intelligent gap detection comparing current coverage to industry-recommended minimums
- Dwelling coverage analysis (vs. replacement cost)
- Personal property assessment (50% of dwelling coverage)
- Liability coverage evaluation (minimum $500K recommended)
- Loss of use adequacy check (20% of dwelling coverage)
- Risk severity classification (Critical, Moderate, Low)

### Results Dashboard
- Overall coverage score with visual gauge (0-100%)
- Total coverage amount display
- Gap count summary
- Risk level indicator (Low/Moderate/High)
- PDF export capability (UI ready)

### Coverage Category Cards
- Individual cards for each coverage type with status badges
- Current vs. recommended amount comparison
- Expandable reasoning sections
- Color-coded status indicators (Adequate/Insufficient/Critical)

### Detailed Gap Analysis
- Comprehensive gap cards with severity indicators
- Specific deficiency explanations
- Real-world risk scenario examples
- Professional recommendations with suggested coverage amounts
- Expandable "Why This Matters" sections

### Visual Coverage Comparison
- Horizontal comparison bars for all coverage categories
- Clear visualization of coverage adequacy
- Side-by-side current vs. target amounts

### Additional Features
- Dark/Light mode support with persistent theme
- Responsive design for mobile, tablet, and desktop
- Professional insurance-themed UI
- Loading states and user feedback
- Toast notifications for analysis completion
- "New Analysis" functionality to reset form

## Technical Architecture

### Frontend (React + TypeScript)
- **Framework**: React with Wouter for routing
- **UI Library**: Shadcn components with Radix UI primitives
- **Styling**: Tailwind CSS with custom design system
- **State Management**: React hooks + TanStack Query for server state
- **Form Handling**: React Hook Form with Zod validation
- **Components**:
  - `PolicyInputForm`: Main data entry component
  - `ResultsSummary`: Analysis overview with gauge
  - `CoverageCategoryCard`: Individual coverage area display
  - `GapAnalysisCard`: Detailed gap information
  - `ComparisonBar`: Visual coverage comparison
  - `CoverageGauge`: Circular progress indicator
  - `AppHeader`: Navigation and theme toggle

### Backend (Express + TypeScript)
- **Server**: Express.js with TypeScript
- **Storage**: In-memory storage (MemStorage)
- **API Endpoints**:
  - `POST /api/analyze-policy`: Analyze coverage and identify gaps
  - `GET /api/policy-analyses`: Retrieve all analyses
  - `GET /api/policy-analyses/:id`: Get specific analysis
- **Validation**: Zod schema validation on all inputs

### Data Schema
Policy analysis includes:
- Property details (address, type, year, square footage, replacement cost)
- Coverage amounts (dwelling, personal property, liability, loss of use, deductible)
- Additional coverages (flood, earthquake)
- Risk factors (claims history, mortgage status)
- Analysis results (overall score, risk level, identified gaps)

## Design System

### Colors
- Primary: Blue (#2563EB) - Trust and professionalism
- Success: Green - Adequate coverage
- Warning: Amber - Moderate risk
- Destructive: Red - Critical gaps
- Neutral grays for backgrounds and text hierarchy

### Typography
- Primary: Inter (sans-serif) - Clean and professional
- Monospace: Roboto Mono - For monetary values and policy numbers
- Three text hierarchy levels (default, secondary, tertiary)

### Components
- Material Design-inspired with subtle shadows
- 6px border radius for modern feel
- Consistent 16-24px spacing
- Elevation system for hover/active states
- Professional insurance aesthetic

## Analysis Logic

### Recommended Coverage Calculations
1. **Dwelling Coverage**: Should equal replacement cost estimate
2. **Personal Property**: 50% of dwelling coverage
3. **Liability Coverage**: Greater of $500K or 50% of dwelling
4. **Loss of Use**: 20% of dwelling coverage

### Gap Severity Thresholds
- **Critical**: >20% below recommended (dwelling), >$200K gap (liability)
- **Moderate**: Below recommended but not critical
- **Low**: Minor adjustments recommended

### Overall Score Calculation
Coverage ratio = (Total Current Coverage / Total Recommended Coverage) × 100
- 80-100%: Low Risk
- 50-79%: Moderate Risk
- 0-49%: High Risk

## Development

### Running the Application
```bash
npm run dev
```
Starts Express server and Vite dev server on the same port.

### Project Structure
```
client/
  src/
    components/     # Reusable UI components
    pages/          # Page components
    lib/            # Utilities (query client, etc.)
server/
  routes.ts         # API endpoint definitions
  storage.ts        # Data storage interface
shared/
  schema.ts         # Shared type definitions
```

### Testing
End-to-end testing completed with Playwright covering:
- Form input and validation
- Analysis submission and results display
- Gap detail expansion
- Coverage comparison visualization
- Navigation and state management

## Future Enhancements

### Potential Next Phase Features
- Multi-policy type support (auto, umbrella, commercial)
- Side-by-side policy comparison
- PDF report generation with branding
- Historical analysis tracking
- Location-based risk assessment using real-time data
- Integration with insurance carrier APIs
- User accounts for saving multiple analyses
- Email report delivery
- Advanced recommendation engine with market data

## User Guide

### How to Use
1. **Enter Property Information**: Provide address, property type, construction details
2. **Input Current Coverage**: Enter your existing policy coverage amounts
3. **Add Additional Details**: Include claims history and mortgage information
4. **Analyze**: Click "Analyze Coverage" to generate comprehensive report
5. **Review Results**: Examine overall score, category breakdowns, and detailed gaps
6. **Take Action**: Use recommendations to discuss coverage improvements with your insurance agent

### Understanding Results
- **Overall Score**: Higher is better (80%+ is good coverage)
- **Status Badges**: Green (adequate), Yellow (needs attention), Red (critical gap)
- **Gap Cards**: Prioritize critical gaps first, then moderate and low priority
- **Risk Scenarios**: Real examples of what could happen with current coverage
- **Recommendations**: Professional guidance on coverage adjustments

## Notes
- All monetary values displayed in USD
- Recommendations based on general industry standards
- Users should consult insurance professionals for personalized advice
- Analysis stored in-memory (resets on server restart)
- Dark mode preference persists in localStorage
