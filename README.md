# 🚗 Smart Parking Management System

A modern, web-based parking management system built with React and TypeScript that helps track and manage vehicle parking efficiently.

## ✨ Features

- **Real-time Parking Management**
  - Track currently parked vehicles
  - Monitor entry and exit times
  - Calculate parking duration automatically

- **Detailed Statistics**
  - Monthly parking analytics
  - Per-vehicle statistics
  - Total parking days tracking
  - Visit frequency monitoring

- **User-Friendly Interface**
  - Clean, modern design
  - Responsive layout
  - Real-time updates
  - Easy vehicle entry/exit management

## 🛠️ Technology Stack

- **Frontend:** React 18 with TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **State Management:** React Hooks
- **Storage:** Browser LocalStorage
- **Type Safety:** TypeScript

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone [repository-url]
   cd parking-management-system
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

## 💡 Usage

1. **Adding a New Vehicle**
   - Enter the vehicle number in the specified format
   - System automatically records entry time
   - Validates vehicle number format

2. **Managing Exits**
   - Click the exit button for departing vehicles
   - System calculates duration and applicable fees
   - Processes payment if required

3. **Viewing Statistics**
   - Monitor real-time parking statistics
   - Track monthly usage patterns
   - View per-vehicle history

## 📊 Data Management

- Automatic cleanup of old entries (90-day retention)
- Entry limit of 10,000 records
- Local storage optimization
- Data persistence across sessions

## 🔒 Security Features

- Input validation for vehicle numbers
- Payment status verification
- Secure state management
- Error handling and validation

## 🎨 UI Components

- Responsive design
- Glass-morphism effects
- Interactive cards and tables
- Real-time status indicators

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Icons by Lucide React
- Background images from Unsplash
- Built with Vite and React
