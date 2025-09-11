// app/layout.js
import './globals.css';
import Sidebar from './Sidebar';

export const metadata = {
  title: 'My App',
  description: 'A Next.js app with a sidebar layout',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div style={{ display: 'flex', minHeight: '100vh' }}>
          <Sidebar />
          <main style={{ flex: 1, padding: '20px' }}>
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
