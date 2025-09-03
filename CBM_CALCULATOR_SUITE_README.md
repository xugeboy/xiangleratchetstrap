# Cargo Securing Calculator Suite

A comprehensive web application for calculating cargo securing requirements based on European standard EN 12195-1. This suite includes multiple calculation tools for safe road transport.

## 🚛 Cargo Securing Calculator (EN 12195-1)

### Overview
The Cargo Securing Calculator implements the European standard EN 12195-1 for calculating the required number of lashing straps for safe road transport. It supports both indirect (frictional) and direct lashing methods with real-time calculations and comprehensive validation.

### Key Features

#### 1. **Lashing Method Selection**
- **Indirect Lashing (Top-Over)**: Uses friction between cargo and vehicle bed
- **Direct Lashing**: Direct connection between cargo attachment points and vehicle

#### 2. **Dynamic Input Forms**
- **Common Fields**: Cargo weight, force direction, friction coefficient
- **Method-Specific Fields**: STF/LC values, vertical/horizontal angles
- **Advanced Options**: Unstable cargo detection with tipping calculations

#### 3. **Real-time Calculations**
- Instant results as users input values
- Comprehensive calculation breakdown
- Safety factor considerations for unstable cargo

#### 4. **Enhanced Validation**
- Input range validation with helpful error messages
- Real-time validation feedback
- Safety warnings for extreme values

### Calculation Methods

#### Indirect Lashing Formula
```
n = ((c_x,y - μ) × m × g) / (2 × μ × STF × sin(α))
```

**Where:**
- `n` = Number of straps required
- `c_x,y` = Force direction coefficient (0.8g for braking, 0.5g for turning)
- `μ` = Friction coefficient between cargo and vehicle bed
- `m` = Cargo mass (kg)
- `g` = Gravitational acceleration (9.81 m/s²)
- `STF` = Standard Tension Force (daN, converted to N)
- `α` = Vertical angle (degrees, converted to radians)

#### Direct Lashing Formula
```
n = (c_x,y × (m × g / 10)) / (LC × cos(α) × cos(β))
```

**Where:**
- `LC` = Lashing Capacity (daN)
- `α` = Vertical angle (degrees)
- `β` = Horizontal angle (degrees)

#### Tipping Calculation
For unstable cargo (height > width), the calculator applies a safety factor:
- **Safety Factor**: `1 + (height/width - 1.5) × 0.3`
- **Final Result**: Maximum of sliding vs. tipping calculations

### Input Parameters

#### Common Parameters
- **Cargo Weight (m)**: Total cargo mass in kilograms
- **Force Direction (c_x,y)**:
  - Forward (Braking): 0.8g
  - Sideways/Rearward (Turning/Acceleration): 0.5g
- **Friction Coefficient (μ)**:
  - Wood on Wood (Dry): 0.45
  - Metal on Wood (Dry): 0.30
  - Concrete on Wood (Dry): 0.55
  - Anti-Slip Mats: 0.60
  - Custom: User-defined value

#### Indirect Lashing Parameters
- **STF (Standard Tension Force)**: Force applied when tensioning strap (daN)
- **Vertical Angle (α)**: Angle between strap and horizontal plane (0-90°)
- **Unstable Cargo Check**: For cargo with height > width
- **Cargo Dimensions**: Height and width for tipping calculations

#### Direct Lashing Parameters
- **LC (Lashing Capacity)**: Maximum allowed force for strap (daN)
- **Vertical Angle (α)**: Angle between strap and horizontal plane (0-90°)
- **Horizontal Angle (β)**: Angle between strap and vehicle axis (0-90°)

### Safety Features

#### Minimum Requirements
- **Always 2 straps minimum** regardless of calculation result
- **Angle validation**: Warning for angles below 15° (reduced effectiveness)
- **Value range validation**: Warnings for unusually high/low values

#### Tipping Protection
- **Automatic detection** of unstable cargo configurations
- **Enhanced safety factors** for high center of gravity cargo
- **Comprehensive calculations** considering both sliding and tipping

### Technical Implementation

#### Architecture
- **Frontend**: Next.js 15 with TypeScript
- **State Management**: React Hooks (useState, useMemo)
- **Validation**: Comprehensive input validation with real-time feedback
- **Styling**: Tailwind CSS with responsive design

#### Components
1. **`LashingCalculator.tsx`**: Main calculator component
2. **`MethodSelector.tsx`**: Lashing method selection interface
3. **`InputForm.tsx`**: Dynamic input forms with validation
4. **`ResultsDisplay.tsx`**: Results display with calculation breakdown
5. **`useEN12195Calculation.ts`**: Calculation logic hook

#### Key Hooks
- **`useEN12195Calculation`**: Main calculation logic
- **`useMemo`**: Optimized calculations with dependency tracking
- **`useState`**: Form state management

### Usage Examples

#### Example 1: Standard Cargo (Indirect Lashing)
- **Cargo Weight**: 1000 kg
- **Force Direction**: Forward (0.8g)
- **Friction**: Wood on Wood (μ = 0.45)
- **STF**: 500 daN
- **Vertical Angle**: 90°
- **Result**: 2 straps (minimum applied)

#### Example 2: Unstable Cargo (Indirect Lashing)
- **Cargo Weight**: 2000 kg
- **Force Direction**: Sideways (0.5g)
- **Friction**: Anti-Slip Mats (μ = 0.60)
- **STF**: 800 daN
- **Vertical Angle**: 75°
- **Height**: 3.0 m, Width: 1.5 m
- **Result**: 3 straps (tipping calculation applied)

#### Example 3: Direct Lashing
- **Cargo Weight**: 1500 kg
- **Force Direction**: Forward (0.8g)
- **LC**: 1000 daN
- **Vertical Angle**: 90°
- **Horizontal Angle**: 90°
- **Result**: 2 straps (minimum applied)

### Safety Guidelines

#### EN 12195-1 Compliance
- Follows European standard for cargo securing
- Implements minimum safety requirements
- Considers both sliding and tipping scenarios

#### Professional Recommendations
- **Always verify calculations** with qualified personnel
- **Inspect securing arrangements** before transport
- **Regular maintenance** of lashing equipment
- **Local regulations** may have additional requirements

#### Warning Signs
- **Very low angles** (< 15°) reduce effectiveness
- **High center of gravity** requires additional precautions
- **Extreme values** should be verified for accuracy

### Future Enhancements

#### Planned Features
- **3D visualization** of lashing arrangements
- **Multiple cargo types** support
- **Advanced tipping calculations** with full EN 12195-1 formulas
- **Export functionality** for reports and documentation
- **Mobile app** version for field use

#### Technical Improvements
- **Performance optimization** for complex calculations
- **Offline support** with service workers
- **Multi-language support** for international users
- **Accessibility improvements** for better usability

---

## 🧮 CBM Calculator

### Overview
The CBM (Cubic Meter) Calculator helps determine cargo volume and loading efficiency for transport planning.

### Features
- Volume calculations for various cargo shapes
- Loading efficiency optimization
- Multiple unit conversions
- Export functionality

---

## 📐 Angle Efficiency Calculator

### Overview
Specialized calculator for determining optimal angles in cargo securing applications.

### Features
- Angle optimization for maximum efficiency
- Force vector analysis
- Safety factor calculations

---

## 🔗 Cargo Securing Tools

### Overview
Comprehensive suite of tools for cargo securing calculations and planning.

### Features
- Multiple calculation methods
- Safety factor considerations
- Professional-grade accuracy
- User-friendly interface

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn package manager

### Installation
```bash
git clone [repository-url]
cd xiangleratchetstrap
npm install
npm run dev
```

### Building for Production
```bash
npm run build
npm start
```

---

## 📚 Documentation

### API Reference
- **Calculation Hooks**: `useEN12195Calculation`, `useCalculation`
- **Type Definitions**: `EN12195Inputs`, `CalculationResult`
- **Utility Functions**: `getFrictionCoefficient`, `degreesToRadians`

### Component API
- **Props**: All components use TypeScript interfaces
- **State Management**: React hooks with proper typing
- **Event Handling**: Consistent callback patterns

---

## 🤝 Contributing

### Development Guidelines
- Follow TypeScript best practices
- Use functional components with hooks
- Implement comprehensive validation
- Maintain responsive design principles

### Testing
- Unit tests for calculation logic
- Integration tests for component interactions
- Accessibility testing for usability

---

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 🆘 Support

### Issues and Questions
- Create GitHub issues for bugs or feature requests
- Check existing documentation and FAQs
- Contact the development team for technical support

### Professional Use
For professional cargo securing applications, always:
- Verify calculations with qualified engineers
- Follow local regulations and standards
- Conduct proper safety inspections
- Maintain equipment according to manufacturer guidelines

---

*This calculator suite is designed to assist with cargo securing planning but should not replace professional engineering judgment or regulatory compliance requirements.*
