// components/Doc.jsx
'use client';
import { useState, useEffect, useRef } from 'react';

export default function Doc() {
  const [expandedSections, setExpandedSections] = useState({
    authentication: false,
    analytics: false
  });
  const [searchQuery, setSearchQuery] = useState('');
  const mainContentRef = useRef(null);

  const sections = [
    { name: 'Overview', id: 'overview', expandable: false },
    { 
      name: 'Authentication', 
      id: 'authentication', 
      expandable: true, 
      subs: [
        { name: 'OTP Generation', id: 'otp-generation' },
        { name: 'OTP Verification', id: 'otp-verification' },
        { name: 'Log Out', id: 'logout' },
        { name: 'Permission Check', id: 'permission-check' }
      ]
    },
    { 
      name: 'Analytics', 
      id: 'analytics', 
      expandable: true, 
      subs: [
        { name: 'Add Data (Main)', id: 'add-data-main' },
        { name: 'Add Data (Main & Sub)', id: 'add-data-sub' },
        { name: 'Update Data (Main)', id: 'update-data-main' },
        { name: 'Update Data (Main & Sub)', id: 'update-data-sub' },
        { name: 'Get Data', id: 'get-data' },
        { name: 'Get Data By Filter', id: 'get-data-filter' },
        { name: 'Full Fetch', id: 'full-fetch' }
      ]
    },
    { name: 'Default Parameters', id: 'default-params', expandable: false },
    { name: 'Error Codes', id: 'error-codes', expandable: false }
  ];

  const filteredSections = sections.filter(section => {
    const matchesSection = section.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSubs = section.expandable && section.subs.some(sub => sub.name.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesSection || matchesSubs;
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => {
      const newState = { authentication: false, analytics: false };
      newState[section] = !prev[section];
      return newState;
    });
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const copyCode = (elementId) => {
    const element = document.getElementById(elementId);
    const text = element.textContent;
    navigator.clipboard.writeText(text);
    
    const btn = document.querySelector(`[onClick="copyCode('${elementId}')"]`);
    if (btn) {
      const originalText = btn.textContent;
      const originalClasses = btn.className;
      
      btn.innerHTML = 'Copied';
      btn.className = originalClasses + ' bg-green-600 text-white';
      
      setTimeout(() => {
        btn.style.display = 'none';
        setTimeout(() => {
          btn.style.display = '';
          btn.innerHTML = originalText;
          btn.className = originalClasses;
        }, 2000);
      }, 2000);
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-white text-gray-900 transition-colors duration-300 font-sans">
      {/* Sidebar */}
      <aside className="w-80 bg-gray-50 border-r border-gray-200 overflow-y-auto flex-shrink-0 transition-all duration-300">
        <div className="p-6 border-b border-gray-200 flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">Z</div>
          <div>
            <h1 className="text-base font-bold text-gray-900">ZEMS API</h1>
            <p className="text-xs text-gray-500">Documentation</p>
          </div>
        </div>

        <div className="p-5 border-b border-gray-200">
          <input 
            type="text" 
            placeholder="Search sections..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-gray-900 text-sm transition-colors duration-200 focus:outline-none focus:border-blue-500"
          />
        </div>

        <nav className="p-3">
          {filteredSections.map(section => (
            <div key={section.id}>
              {section.expandable ? (
                <>
                  <div 
                    className={`flex items-center gap-2.5 px-5 py-2.5 cursor-pointer text-gray-700 text-sm font-medium transition-colors duration-200 hover:bg-gray-100 rounded-lg ${expandedSections[section.id] ? 'bg-gray-100' : ''}`}
                    onClick={() => toggleSection(section.id)}
                  >
                    <span>{section.id === 'authentication' ? '🔐' : '📊'}</span>
                    <span>{section.name}</span>
                    <span className={`ml-auto transition-transform duration-200 text-xs ${expandedSections[section.id] ? 'rotate-90' : ''}`}>▶</span>
                  </div>
                  
                  <div className={`overflow-hidden transition-all duration-300 ${expandedSections[section.id] ? 'max-h-96' : 'max-h-0'}`}>
                    {section.subs.map(sub => (
                      <div 
                        key={sub.id}
                        className="flex items-center pl-12 pr-5 py-2 cursor-pointer text-gray-500 text-sm transition-colors duration-200 hover:bg-gray-100 hover:text-gray-700 rounded-lg"
                        onClick={() => scrollToSection(sub.id)}
                      >
                        {sub.name}
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <div 
                  className="flex items-center gap-2.5 px-5 py-2.5 cursor-pointer text-gray-700 text-sm font-medium transition-colors duration-200 hover:bg-gray-100 rounded-lg"
                  onClick={() => scrollToSection(section.id)}
                >
                  <span>{section.id === 'overview' ? '📋' : section.id === 'default-params' ? '⚙️' : '⚠️'}</span>
                  <span>{section.name}</span>
                </div>
              )}
            </div>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main 
        ref={mainContentRef}
        className="flex-1 overflow-y-auto"
      >
        <div className="p-8">
        <div className="flex justify-between items-center mb-8 pb-4 border-b-2 border-gray-200">
          <h2 className="text-3xl font-bold text-gray-900 font-sans">API Documentation</h2>
        </div>

        {/* Overview Section */}
        <section id="overview" className="mb-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3 font-sans">📋 Overview</h3>
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <p className="text-gray-600 leading-relaxed mb-4 font-sans text-left">
              Welcome to the ZEMS API Documentation. This is a JSON-based POST API for authentication and analytics operations. 
              All endpoints use the same base URL and require default parameters (login_id, device_id, etc.).
            </p>
            <div className="bg-gray-50 px-4 py-3 rounded-lg font-mono text-sm text-blue-600 mb-4 overflow-x-auto dark:bg-gray-900 dark:text-blue-400 text-left">
              https://task.catalystserverless.com/server/zrubix/zems
            </div>
            <p className="text-gray-600 leading-relaxed dark:text-gray-400 font-sans text-left">
              Responses are in JSON format. Save authentication values returned during login (e.g., <code className="bg-gray-100 px-1.5 py-0.5 rounded text-blue-600 text-sm font-mono dark:bg-gray-700 dark:text-blue-400">login_id</code>, 
              <code className="bg-gray-100 px-1.5 py-0.5 rounded text-blue-600 text-sm font-mono dark:bg-gray-700 dark:text-blue-400">device_id</code>, <code className="bg-gray-100 px-1.5 py-0.5 rounded text-blue-600 text-sm font-mono dark:bg-gray-700 dark:text-blue-400">user_id</code>) and include them in subsequent calls.
            </p>
          </div>
        </section>

        {/* Authentication Section */}
        <section id="authentication" className="mb-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3 dark:text-white font-sans">🔐 Authentication</h3>

          {/* OTP Generation */}
          <div id="otp-generation" className="bg-white border border-gray-200 rounded-xl p-6 mb-6 shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <div className="flex justify-between items-center mb-4">
              <div className="text-lg font-bold text-gray-900 dark:text-white font-sans">OTP Generation</div>
              <div className="px-3 py-1.5 bg-green-600 text-white text-xs font-bold rounded font-sans">POST</div>
            </div>
            <div className="bg-gray-50 px-4 py-3 rounded-lg font-mono text-sm text-blue-600 mb-4 overflow-x-auto dark:bg-gray-900 dark:text-blue-400 text-left">
              /server/zrubix/zems
            </div>
            <p className="text-gray-600 mb-6 dark:text-gray-400 font-sans text-left">Initiates OTP generation for the provided phone number.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-gray-50 border border-gray-200 rounded-lg overflow-hidden dark:bg-gray-900 dark:border-gray-700">
                <div className="px-4 py-3 bg-gray-100 border-b border-gray-200 flex justify-between items-center dark:bg-gray-800 dark:border-gray-700">
                  <span className="text-sm font-semibold text-gray-900 dark:text-white font-sans">Request Body</span>
                  <button 
                    onClick={() => copyCode('otp-gen-req')}
                    className="px-3 py-1.5 bg-blue-600 text-white text-xs font-semibold rounded cursor-pointer transition-colors duration-200 hover:bg-blue-700 font-sans"
                  >
                    Copy
                  </button>
                </div>
                <div className="p-4 overflow-x-auto">
                  <pre id="otp-gen-req" className="font-mono text-sm text-gray-800 leading-relaxed dark:text-gray-300 text-left whitespace-pre-wrap">
{`{
  "app": "authenticate_user",
  "function": "otp_generation",
  "phone": "918778660848"
}`}
                  </pre>
                </div>
              </div>
              
              <div className="bg-gray-50 border border-gray-200 rounded-lg overflow-hidden dark:bg-gray-900 dark:border-gray-700">
                <div className="px-4 py-3 bg-gray-100 border-b border-gray-200 flex justify-between items-center dark:bg-gray-800 dark:border-gray-700">
                  <span className="text-sm font-semibold text-gray-900 dark:text-white font-sans">Success Response</span>
                  <button 
                    onClick={() => copyCode('otp-gen-res')}
                    className="px-3 py-1.5 bg-blue-600 text-white text-xs font-semibold rounded cursor-pointer transition-colors duration-200 hover:bg-blue-700 font-sans"
                  >
                    Copy
                  </button>
                </div>
                <div className="p-4 overflow-x-auto">
                  <pre id="otp-gen-res" className="font-mono text-sm text-gray-800 leading-relaxed dark:text-gray-300 text-left whitespace-pre-wrap">
{`{
  "status": "success",
  "code": 200,
  "message": "OTP Sent Successfully",
  "user_name": "Bharathiselvan",
  "user_id": "1759736522245",
  "device_id": "Z9187786608481761310294745",
  "login_id": "Z9187786608481761370544562"
}`}
                  </pre>
                </div>
              </div>
            </div>

            <p className="text-gray-600 font-semibold mb-4 dark:text-gray-400 font-sans text-left">Failure Responses:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 border border-gray-200 rounded-lg overflow-hidden dark:bg-gray-900 dark:border-gray-700">
                <div className="px-4 py-3 bg-gray-100 border-b border-gray-200 flex justify-between items-center dark:bg-gray-800 dark:border-gray-700">
                  <span className="text-sm font-semibold text-gray-900 dark:text-white font-sans">User Not Found</span>
                  <button 
                    onClick={() => copyCode('otp-gen-fail1')}
                    className="px-3 py-1.5 bg-blue-600 text-white text-xs font-semibold rounded cursor-pointer transition-colors duration-200 hover:bg-blue-700 font-sans"
                  >
                    Copy
                  </button>
                </div>
                <div className="p-4 overflow-x-auto">
                  <pre id="otp-gen-fail1" className="font-mono text-sm text-gray-800 leading-relaxed dark:text-gray-300 text-left whitespace-pre-wrap">
{`{
  "status": "failure",
  "code": 404,
  "message": "User Not Found"
}`}
                  </pre>
                </div>
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-lg overflow-hidden dark:bg-gray-900 dark:border-gray-700">
                <div className="px-4 py-3 bg-gray-100 border-b border-gray-200 flex justify-between items-center dark:bg-gray-800 dark:border-gray-700">
                  <span className="text-sm font-semibold text-gray-900 dark:text-white font-sans">Multiple Device Not Allowed</span>
                  <button 
                    onClick={() => copyCode('otp-gen-fail2')}
                    className="px-3 py-1.5 bg-blue-600 text-white text-xs font-semibold rounded cursor-pointer transition-colors duration-200 hover:bg-blue-700 font-sans"
                  >
                    Copy
                  </button>
                </div>
                <div className="p-4 overflow-x-auto">
                  <pre id="otp-gen-fail2" className="font-mono text-sm text-gray-800 leading-relaxed dark:text-gray-300 text-left whitespace-pre-wrap">
{`{
  "status": "failure",
  "code": 404,
  "message": "User Active - Multiple Device Not Allowed"
}`}
                  </pre>
                </div>
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-lg overflow-hidden dark:bg-gray-900 dark:border-gray-700">
                <div className="px-4 py-3 bg-gray-100 border-b border-gray-200 flex justify-between items-center dark:bg-gray-800 dark:border-gray-700">
                  <span className="text-sm font-semibold text-gray-900 dark:text-white font-sans">User Not Active</span>
                  <button 
                    onClick={() => copyCode('otp-gen-fail3')}
                    className="px-3 py-1.5 bg-blue-600 text-white text-xs font-semibold rounded cursor-pointer transition-colors duration-200 hover:bg-blue-700 font-sans"
                  >
                    Copy
                  </button>
                </div>
                <div className="p-4 overflow-x-auto">
                  <pre id="otp-gen-fail3" className="font-mono text-sm text-gray-800 leading-relaxed dark:text-gray-300 text-left whitespace-pre-wrap">
{`{
  "status": "failure",
  "code": 404,
  "message": "User Not Active"
}`}
                  </pre>
                </div>
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-lg overflow-hidden dark:bg-gray-900 dark:border-gray-700">
                <div className="px-4 py-3 bg-gray-100 border-b border-gray-200 flex justify-between items-center dark:bg-gray-800 dark:border-gray-700">
                  <span className="text-sm font-semibold text-gray-900 dark:text-white font-sans">Device Not Matched</span>
                  <button 
                    onClick={() => copyCode('otp-gen-fail4')}
                    className="px-3 py-1.5 bg-blue-600 text-white text-xs font-semibold rounded cursor-pointer transition-colors duration-200 hover:bg-blue-700 font-sans"
                  >
                    Copy
                  </button>
                </div>
                <div className="p-4 overflow-x-auto">
                  <pre id="otp-gen-fail4" className="font-mono text-sm text-gray-800 leading-relaxed dark:text-gray-300 text-left whitespace-pre-wrap">
{`{
  "status": "failure",
  "code": 404,
  "message": "User Active - Device Not Matched"
}`}
                  </pre>
                </div>
              </div>
            </div>
          </div>

          {/* OTP Verification */}
          <div id="otp-verification" className="bg-white border border-gray-200 rounded-xl p-6 mb-6 shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <div className="flex justify-between items-center mb-4">
              <div className="text-lg font-bold text-gray-900 dark:text-white font-sans">OTP Verification</div>
              <div className="px-3 py-1.5 bg-green-600 text-white text-xs font-bold rounded font-sans">POST</div>
            </div>
            <div className="bg-gray-50 px-4 py-3 rounded-lg font-mono text-sm text-blue-600 mb-4 overflow-x-auto dark:bg-gray-900 dark:text-blue-400 text-left">
              /server/zrubix/zems
            </div>
            <p className="text-gray-600 mb-6 dark:text-gray-400 font-sans text-left">Verify OTP provided by user to complete login.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-gray-50 border border-gray-200 rounded-lg overflow-hidden dark:bg-gray-900 dark:border-gray-700">
                <div className="px-4 py-3 bg-gray-100 border-b border-gray-200 flex justify-between items-center dark:bg-gray-800 dark:border-gray-700">
                  <span className="text-sm font-semibold text-gray-900 dark:text-white font-sans">Request Body</span>
                  <button 
                    onClick={() => copyCode('otp-verify-req')}
                    className="px-3 py-1.5 bg-blue-600 text-white text-xs font-semibold rounded cursor-pointer transition-colors duration-200 hover:bg-blue-700 font-sans"
                  >
                    Copy
                  </button>
                </div>
                <div className="p-4 overflow-x-auto">
                  <pre id="otp-verify-req" className="font-mono text-sm text-gray-800 leading-relaxed dark:text-gray-300 text-left whitespace-pre-wrap">
{`{
  "app": "authenticate_user",
  "function": "otp_verification",
  "otp_code": 1234
}`}
                  </pre>
                </div>
              </div>
              
              <div className="bg-gray-50 border border-gray-200 rounded-lg overflow-hidden dark:bg-gray-900 dark:border-gray-700">
                <div className="px-4 py-3 bg-gray-100 border-b border-gray-200 flex justify-between items-center dark:bg-gray-800 dark:border-gray-700">
                  <span className="text-sm font-semibold text-gray-900 dark:text-white font-sans">Success Response</span>
                  <button 
                    onClick={() => copyCode('otp-verify-res')}
                    className="px-3 py-1.5 bg-blue-600 text-white text-xs font-semibold rounded cursor-pointer transition-colors duration-200 hover:bg-blue-700 font-sans"
                  >
                    Copy
                  </button>
                </div>
                <div className="p-4 overflow-x-auto">
                  <pre id="otp-verify-res" className="font-mono text-sm text-gray-800 leading-relaxed dark:text-gray-300 text-left whitespace-pre-wrap">
{`{
  "code": 200,
  "status": "login_success",
  "message": "OTP Verified Successfully",
  "otp_code": "4002",
  "last_audit_record_id": 1761380818150,
  "phone": "918778660848"
}`}
                  </pre>
                </div>
              </div>
            </div>

            <p className="text-gray-600 font-semibold mb-4 dark:text-gray-400 font-sans text-left">Failure Response:</p>
            <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
              <div className="bg-gray-50 border border-gray-200 rounded-lg overflow-hidden dark:bg-gray-900 dark:border-gray-700">
                <div className="px-4 py-3 bg-gray-100 border-b border-gray-200 flex justify-between items-center dark:bg-gray-800 dark:border-gray-700">
                  <span className="text-sm font-semibold text-gray-900 dark:text-white font-sans">OTP Not Matched</span>
                  <button 
                    onClick={() => copyCode('otp-verify-fail')}
                    className="px-3 py-1.5 bg-blue-600 text-white text-xs font-semibold rounded cursor-pointer transition-colors duration-200 hover:bg-blue-700 font-sans"
                  >
                    Copy
                  </button>
                </div>
                <div className="p-4 overflow-x-auto">
                  <pre id="otp-verify-fail" className="font-mono text-sm text-gray-800 leading-relaxed dark:text-gray-300 text-left whitespace-pre-wrap">
{`{
  "code": 404,
  "status": "failure",
  "message": "OTP Not Matched"
}`}
                  </pre>
                </div>
              </div>
            </div>
          </div>

          {/* Logout */}
          <div id="logout" className="bg-white border border-gray-200 rounded-xl p-6 mb-6 shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <div className="flex justify-between items-center mb-4">
              <div className="text-lg font-bold text-gray-900 dark:text-white font-sans">Log Out</div>
              <div className="px-3 py-1.5 bg-green-600 text-white text-xs font-bold rounded font-sans">POST</div>
            </div>
            <div className="bg-gray-50 px-4 py-3 rounded-lg font-mono text-sm text-blue-600 mb-4 overflow-x-auto dark:bg-gray-900 dark:text-blue-400 text-left">
              /server/zrubix/zems
            </div>
            <p className="text-gray-600 mb-6 dark:text-gray-400 font-sans text-left">Terminates the user session on server.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-gray-50 border border-gray-200 rounded-lg overflow-hidden dark:bg-gray-900 dark:border-gray-700">
                <div className="px-4 py-3 bg-gray-100 border-b border-gray-200 flex justify-between items-center dark:bg-gray-800 dark:border-gray-700">
                  <span className="text-sm font-semibold text-gray-900 dark:text-white font-sans">Request Body</span>
                  <button 
                    onClick={() => copyCode('logout-req')}
                    className="px-3 py-1.5 bg-blue-600 text-white text-xs font-semibold rounded cursor-pointer transition-colors duration-200 hover:bg-blue-700 font-sans"
                  >
                    Copy
                  </button>
                </div>
                <div className="p-4 overflow-x-auto">
                  <pre id="logout-req" className="font-mono text-sm text-gray-800 leading-relaxed dark:text-gray-300 text-left whitespace-pre-wrap">
{`{
  "app": "authenticate_user",
  "function": "user_logout"
}`}
                  </pre>
                </div>
              </div>
              
              <div className="bg-gray-50 border border-gray-200 rounded-lg overflow-hidden dark:bg-gray-900 dark:border-gray-700">
                <div className="px-4 py-3 bg-gray-100 border-b border-gray-200 flex justify-between items-center dark:bg-gray-800 dark:border-gray-700">
                  <span className="text-sm font-semibold text-gray-900 dark:text-white font-sans">Success Response</span>
                  <button 
                    onClick={() => copyCode('logout-res')}
                    className="px-3 py-1.5 bg-blue-600 text-white text-xs font-semibold rounded cursor-pointer transition-colors duration-200 hover:bg-blue-700 font-sans"
                  >
                    Copy
                  </button>
                </div>
                <div className="p-4 overflow-x-auto">
                  <pre id="logout-res" className="font-mono text-sm text-gray-800 leading-relaxed dark:text-gray-300 text-left whitespace-pre-wrap">
{`{
  "code": 200,
  "status": "success",
  "message": "logout_success"
}`}
                  </pre>
                </div>
              </div>
            </div>

            <p className="text-gray-600 font-semibold mb-4 dark:text-gray-400 font-sans text-left">Failure Response:</p>
            <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
              <div className="bg-gray-50 border border-gray-200 rounded-lg overflow-hidden dark:bg-gray-900 dark:border-gray-700">
                <div className="px-4 py-3 bg-gray-100 border-b border-gray-200 flex justify-between items-center dark:bg-gray-800 dark:border-gray-700">
                  <span className="text-sm font-semibold text-gray-900 dark:text-white font-sans">Logout Failed</span>
                  <button 
                    onClick={() => copyCode('logout-fail')}
                    className="px-3 py-1.5 bg-blue-600 text-white text-xs font-semibold rounded cursor-pointer transition-colors duration-200 hover:bg-blue-700 font-sans"
                  >
                    Copy
                  </button>
                </div>
                <div className="p-4 overflow-x-auto">
                  <pre id="logout-fail" className="font-mono text-sm text-gray-800 leading-relaxed dark:text-gray-300 text-left whitespace-pre-wrap">
{`{
  "code": 404,
  "status": "failure",
  "message": "User Not Found or Not Logged In"
}`}
                  </pre>
                </div>
              </div>
            </div>
          </div>

          {/* Permission Check */}
          <div id="permission-check" className="bg-white border border-gray-200 rounded-xl p-6 mb-6 shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <div className="flex justify-between items-center mb-4">
              <div className="text-lg font-bold text-gray-900 dark:text-white font-sans">Permission Check</div>
              <div className="px-3 py-1.5 bg-green-600 text-white text-xs font-bold rounded font-sans">POST</div>
            </div>
            <div className="bg-gray-50 px-4 py-3 rounded-lg font-mono text-sm text-blue-600 mb-4 overflow-x-auto dark:bg-gray-900 dark:text-blue-400 text-left">
              /server/zrubix/zems
            </div>
            <p className="text-gray-600 mb-6 dark:text-gray-400 font-sans text-left">Checks user permissions for the authenticated session.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-gray-50 border border-gray-200 rounded-lg overflow-hidden dark:bg-gray-900 dark:border-gray-700">
                <div className="px-4 py-3 bg-gray-100 border-b border-gray-200 flex justify-between items-center dark:bg-gray-800 dark:border-gray-700">
                  <span className="text-sm font-semibold text-gray-900 dark:text-white font-sans">Request Body</span>
                  <button 
                    onClick={() => copyCode('perm-req')}
                    className="px-3 py-1.5 bg-blue-600 text-white text-xs font-semibold rounded cursor-pointer transition-colors duration-200 hover:bg-blue-700 font-sans"
                  >
                    Copy
                  </button>
                </div>
                <div className="p-4 overflow-x-auto">
                  <pre id="perm-req" className="font-mono text-sm text-gray-800 leading-relaxed dark:text-gray-300 text-left whitespace-pre-wrap">
{`{
  "app": "authenticate_user",
  "function": "check_permission"
}`}
                  </pre>
                </div>
              </div>
              
              <div className="bg-gray-50 border border-gray-200 rounded-lg overflow-hidden dark:bg-gray-900 dark:border-gray-700">
                <div className="px-4 py-3 bg-gray-100 border-b border-gray-200 flex justify-between items-center dark:bg-gray-800 dark:border-gray-700">
                  <span className="text-sm font-semibold text-gray-900 dark:text-white font-sans">Success Response</span>
                  <button 
                    onClick={() => copyCode('perm-res')}
                    className="px-3 py-1.5 bg-blue-600 text-white text-xs font-semibold rounded cursor-pointer transition-colors duration-200 hover:bg-blue-700 font-sans"
                  >
                    Copy
                  </button>
                </div>
                <div className="p-4 overflow-x-auto">
                  <pre id="perm-res" className="font-mono text-sm text-gray-800 leading-relaxed dark:text-gray-300 text-left whitespace-pre-wrap">
{`{
  "status": "success",
  "code": 200,
  "message": "Permissions fetched",
  "permissions": []
}`}
                  </pre>
                </div>
              </div>
            </div>

            <p className="text-gray-600 font-semibold mb-4 dark:text-gray-400 font-sans text-left">Failure Response:</p>
            <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
              <div className="bg-gray-50 border border-gray-200 rounded-lg overflow-hidden dark:bg-gray-900 dark:border-gray-700">
                <div className="px-4 py-3 bg-gray-100 border-b border-gray-200 flex justify-between items-center dark:bg-gray-800 dark:border-gray-700">
                  <span className="text-sm font-semibold text-gray-900 dark:text-white font-sans">Permission Check Failed</span>
                  <button 
                    onClick={() => copyCode('perm-fail')}
                    className="px-3 py-1.5 bg-blue-600 text-white text-xs font-semibold rounded cursor-pointer transition-colors duration-200 hover:bg-blue-700 font-sans"
                  >
                    Copy
                  </button>
                </div>
                <div className="p-4 overflow-x-auto">
                  <pre id="perm-fail" className="font-mono text-sm text-gray-800 leading-relaxed dark:text-gray-300 text-left whitespace-pre-wrap">
{`{
  "status": "failure",
  "code": 401,
  "message": "Unauthorized Access"
}`}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Analytics Section */}
        <section id="analytics" className="mb-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3 dark:text-white font-sans">📊 Analytics</h3>

          {/* Add Data Main */}
          <div id="add-data-main" className="bg-white border border-gray-200 rounded-xl p-6 mb-6 shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <div className="flex justify-between items-center mb-4">
              <div className="text-lg font-bold text-gray-900 dark:text-white font-sans">Add Data (Main Form Only)</div>
              <div className="px-3 py-1.5 bg-green-600 text-white text-xs font-bold rounded font-sans">POST</div>
            </div>
            <div className="bg-gray-50 px-4 py-3 rounded-lg font-mono text-sm text-blue-600 mb-4 overflow-x-auto dark:bg-gray-900 dark:text-blue-400 text-left">
              /server/zrubix/zems
            </div>
            <p className="text-gray-600 mb-6 dark:text-gray-400 font-sans text-left">Adds a record to the main analytics form.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-gray-50 border border-gray-200 rounded-lg overflow-hidden dark:bg-gray-900 dark:border-gray-700">
                <div className="px-4 py-3 bg-gray-100 border-b border-gray-200 flex justify-between items-center dark:bg-gray-800 dark:border-gray-700">
                  <span className="text-sm font-semibold text-gray-900 dark:text-white font-sans">Request Body</span>
                  <button 
                    onClick={() => copyCode('add-main-req')}
                    className="px-3 py-1.5 bg-blue-600 text-white text-xs font-semibold rounded cursor-pointer transition-colors duration-200 hover:bg-blue-700 font-sans"
                  >
                    Copy
                  </button>
                </div>
                <div className="p-4 overflow-x-auto">
                  <pre id="add-main-req" className="font-mono text-sm text-gray-800 leading-relaxed dark:text-gray-300 text-left whitespace-pre-wrap">
{`{
  "app": "analytics",
  "function": "add_main_form_data",
  "main_parameters": {
    "view_id": "256917400006145039",
    "data": {
      "role_name": "Developer",
      "created_time": "2025-10-28 14:48:29",
      "modified_time": "2025-10-28 14:48:29"
    }
  }
}`}
                  </pre>
                </div>
              </div>
              
              <div className="bg-gray-50 border border-gray-200 rounded-lg overflow-hidden dark:bg-gray-900 dark:border-gray-700">
                <div className="px-4 py-3 bg-gray-100 border-b border-gray-200 flex justify-between items-center dark:bg-gray-800 dark:border-gray-700">
                  <span className="text-sm font-semibold text-gray-900 dark:text-white font-sans">Success Response</span>
                  <button 
                    onClick={() => copyCode('add-main-res')}
                    className="px-3 py-1.5 bg-blue-600 text-white text-xs font-semibold rounded cursor-pointer transition-colors duration-200 hover:bg-blue-700 font-sans"
                  >
                    Copy
                  </button>
                </div>
                <div className="p-4 overflow-x-auto">
                  <pre id="add-main-res" className="font-mono text-sm text-gray-800 leading-relaxed dark:text-gray-300 text-left whitespace-pre-wrap">
{`{
  "status": "success",
  "code": 200,
  "message": "Record added"
}`}
                  </pre>
                </div>
              </div>
            </div>

            <p className="text-gray-600 font-semibold mb-4 dark:text-gray-400 font-sans text-left">Failure Response:</p>
            <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
              <div className="bg-gray-50 border border-gray-200 rounded-lg overflow-hidden dark:bg-gray-900 dark:border-gray-700">
                <div className="px-4 py-3 bg-gray-100 border-b border-gray-200 flex justify-between items-center dark:bg-gray-800 dark:border-gray-700">
                  <span className="text-sm font-semibold text-gray-900 dark:text-white font-sans">Add Failed</span>
                  <button 
                    onClick={() => copyCode('add-main-fail')}
                    className="px-3 py-1.5 bg-blue-600 text-white text-xs font-semibold rounded cursor-pointer transition-colors duration-200 hover:bg-blue-700 font-sans"
                  >
                    Copy
                  </button>
                </div>
                <div className="p-4 overflow-x-auto">
                  <pre id="add-main-fail" className="font-mono text-sm text-gray-800 leading-relaxed dark:text-gray-300 text-left whitespace-pre-wrap">
{`{
  "status": "failure",
  "code": 400,
  "message": "Failed to add record"
}`}
                  </pre>
                </div>
              </div>
            </div>
          </div>

          {/* Add Data Main & Sub */}
          <div id="add-data-sub" className="bg-white border border-gray-200 rounded-xl p-6 mb-6 shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <div className="flex justify-between items-center mb-4">
              <div className="text-lg font-bold text-gray-900 dark:text-white font-sans">Add Data (Main & Sub Forms)</div>
              <div className="px-3 py-1.5 bg-green-600 text-white text-xs font-bold rounded font-sans">POST</div>
            </div>
            <div className="bg-gray-50 px-4 py-3 rounded-lg font-mono text-sm text-blue-600 mb-4 overflow-x-auto dark:bg-gray-900 dark:text-blue-400 text-left">
              /server/zrubix/zems
            </div>
            <p className="text-gray-600 mb-6 dark:text-gray-400 font-sans text-left">Adds a main record and related subform records in one request.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-gray-50 border border-gray-200 rounded-lg overflow-hidden dark:bg-gray-900 dark:border-gray-700">
                <div className="px-4 py-3 bg-gray-100 border-b border-gray-200 flex justify-between items-center dark:bg-gray-800 dark:border-gray-700">
                  <span className="text-sm font-semibold text-gray-900 dark:text-white font-sans">Request Body</span>
                  <button 
                    onClick={() => copyCode('add-sub-req')}
                    className="px-3 py-1.5 bg-blue-600 text-white text-xs font-semibold rounded cursor-pointer transition-colors duration-200 hover:bg-blue-700 font-sans"
                  >
                    Copy
                  </button>
                </div>
                <div className="p-4 overflow-x-auto">
                  <pre id="add-sub-req" className="font-mono text-sm text-gray-800 leading-relaxed dark:text-gray-300 text-left whitespace-pre-wrap">
{`{
  "app": "analytics",
  "function": "add_main_and_sub_form_data",
  "main_parameters": {
    "view_id": "256917400006679001",
    "data": {
      "designation": "dev1",
      "created_time": "2025-10-28 19:28:09"
    }
  },
  "sub_form_parameters_1": {
    "view_id": "256917400006679039",
    "data": {
      "sub_data": [
        {"sub_designation":"devs1","sl_no":1},
        {"sub_designation":"devs2","sl_no":2}
      ]
    }
  }
}`}
                  </pre>
                </div>
              </div>
              
              <div className="bg-gray-50 border border-gray-200 rounded-lg overflow-hidden dark:bg-gray-900 dark:border-gray-700">
                <div className="px-4 py-3 bg-gray-100 border-b border-gray-200 flex justify-between items-center dark:bg-gray-800 dark:border-gray-700">
                  <span className="text-sm font-semibold text-gray-900 dark:text-white font-sans">Success Response</span>
                  <button 
                    onClick={() => copyCode('add-sub-res')}
                    className="px-3 py-1.5 bg-blue-600 text-white text-xs font-semibold rounded cursor-pointer transition-colors duration-200 hover:bg-blue-700 font-sans"
                  >
                    Copy
                  </button>
                </div>
                <div className="p-4 overflow-x-auto">
                  <pre id="add-sub-res" className="font-mono text-sm text-gray-800 leading-relaxed dark:text-gray-300 text-left whitespace-pre-wrap">
{`{
  "status": "success",
  "code": 200,
  "message": "Record added (main + sub)"
}`}
                  </pre>
                </div>
              </div>
            </div>

            <p className="text-gray-600 font-semibold mb-4 dark:text-gray-400 font-sans text-left">Failure Response:</p>
            <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
              <div className="bg-gray-50 border border-gray-200 rounded-lg overflow-hidden dark:bg-gray-900 dark:border-gray-700">
                <div className="px-4 py-3 bg-gray-100 border-b border-gray-200 flex justify-between items-center dark:bg-gray-800 dark:border-gray-700">
                  <span className="text-sm font-semibold text-gray-900 dark:text-white font-sans">Add Failed</span>
                  <button 
                    onClick={() => copyCode('add-sub-fail')}
                    className="px-3 py-1.5 bg-blue-600 text-white text-xs font-semibold rounded cursor-pointer transition-colors duration-200 hover:bg-blue-700 font-sans"
                  >
                    Copy
                  </button>
                </div>
                <div className="p-4 overflow-x-auto">
                  <pre id="add-sub-fail" className="font-mono text-sm text-gray-800 leading-relaxed dark:text-gray-300 text-left whitespace-pre-wrap">
{`{
  "status": "failure",
  "code": 400,
  "message": "Failed to add records"
}`}
                  </pre>
                </div>
              </div>
            </div>
          </div>

          {/* Update Data Main */}
          <div id="update-data-main" className="bg-white border border-gray-200 rounded-xl p-6 mb-6 shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <div className="flex justify-between items-center mb-4">
              <div className="text-lg font-bold text-gray-900 dark:text-white font-sans">Update Data (Main Form Only)</div>
              <div className="px-3 py-1.5 bg-green-600 text-white text-xs font-bold rounded font-sans">POST</div>
            </div>
            <div className="bg-gray-50 px-4 py-3 rounded-lg font-mono text-sm text-blue-600 mb-4 overflow-x-auto dark:bg-gray-900 dark:text-blue-400 text-left">
              /server/zrubix/zems
            </div>
            <p className="text-gray-600 mb-6 dark:text-gray-400 font-sans text-left">Updates an existing record in the main analytics form.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-gray-50 border border-gray-200 rounded-lg overflow-hidden dark:bg-gray-900 dark:border-gray-700">
                <div className="px-4 py-3 bg-gray-100 border-b border-gray-200 flex justify-between items-center dark:bg-gray-800 dark:border-gray-700">
                  <span className="text-sm font-semibold text-gray-900 dark:text-white font-sans">Request Body</span>
                  <button 
                    onClick={() => copyCode('update-main-req')}
                    className="px-3 py-1.5 bg-blue-600 text-white text-xs font-semibold rounded cursor-pointer transition-colors duration-200 hover:bg-blue-700 font-sans"
                  >
                    Copy
                  </button>
                </div>
                <div className="p-4 overflow-x-auto">
                  <pre id="update-main-req" className="font-mono text-sm text-gray-800 leading-relaxed dark:text-gray-300 text-left whitespace-pre-wrap">
{`{
  "app": "analytics",
  "function": "update_main_form_data",
  "main_parameters": {
    "view_id": "256917400006145039",
    "record_id": "256917400006145040",
    "data": {
      "role_name": "Senior Developer",
      "modified_time": "2025-10-30 14:48:29"
    }
  }
}`}
                  </pre>
                </div>
              </div>
              
              <div className="bg-gray-50 border border-gray-200 rounded-lg overflow-hidden dark:bg-gray-900 dark:border-gray-700">
                <div className="px-4 py-3 bg-gray-100 border-b border-gray-200 flex justify-between items-center dark:bg-gray-800 dark:border-gray-700">
                  <span className="text-sm font-semibold text-gray-900 dark:text-white font-sans">Success Response</span>
                  <button 
                    onClick={() => copyCode('update-main-res')}
                    className="px-3 py-1.5 bg-blue-600 text-white text-xs font-semibold rounded cursor-pointer transition-colors duration-200 hover:bg-blue-700 font-sans"
                  >
                    Copy
                  </button>
                </div>
                <div className="p-4 overflow-x-auto">
                  <pre id="update-main-res" className="font-mono text-sm text-gray-800 leading-relaxed dark:text-gray-300 text-left whitespace-pre-wrap">
{`{
  "status": "success",
  "code": 200,
  "message": "Record updated"
}`}
                  </pre>
                </div>
              </div>
            </div>

            <p className="text-gray-600 font-semibold mb-4 dark:text-gray-400 font-sans text-left">Failure Response:</p>
            <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
              <div className="bg-gray-50 border border-gray-200 rounded-lg overflow-hidden dark:bg-gray-900 dark:border-gray-700">
                <div className="px-4 py-3 bg-gray-100 border-b border-gray-200 flex justify-between items-center dark:bg-gray-800 dark:border-gray-700">
                  <span className="text-sm font-semibold text-gray-900 dark:text-white font-sans">Update Failed</span>
                  <button 
                    onClick={() => copyCode('update-main-fail')}
                    className="px-3 py-1.5 bg-blue-600 text-white text-xs font-semibold rounded cursor-pointer transition-colors duration-200 hover:bg-blue-700 font-sans"
                  >
                    Copy
                  </button>
                </div>
                <div className="p-4 overflow-x-auto">
                  <pre id="update-main-fail" className="font-mono text-sm text-gray-800 leading-relaxed dark:text-gray-300 text-left whitespace-pre-wrap">
{`{
  "status": "failure",
  "code": 404,
  "message": "Record not found or update failed"
}`}
                  </pre>
                </div>
              </div>
            </div>
          </div>

          {/* Update Data Main & Sub */}
          <div id="update-data-sub" className="bg-white border border-gray-200 rounded-xl p-6 mb-6 shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <div className="flex justify-between items-center mb-4">
              <div className="text-lg font-bold text-gray-900 dark:text-white font-sans">Update Data (Main & Sub Forms)</div>
              <div className="px-3 py-1.5 bg-green-600 text-white text-xs font-bold rounded font-sans">POST</div>
            </div>
            <div className="bg-gray-50 px-4 py-3 rounded-lg font-mono text-sm text-blue-600 mb-4 overflow-x-auto dark:bg-gray-900 dark:text-blue-400 text-left">
              /server/zrubix/zems
            </div>
            <p className="text-gray-600 mb-6 dark:text-gray-400 font-sans text-left">Updates a main record and related subform records in one request.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-gray-50 border border-gray-200 rounded-lg overflow-hidden dark:bg-gray-900 dark:border-gray-700">
                <div className="px-4 py-3 bg-gray-100 border-b border-gray-200 flex justify-between items-center dark:bg-gray-800 dark:border-gray-700">
                  <span className="text-sm font-semibold text-gray-900 dark:text-white font-sans">Request Body</span>
                  <button 
                    onClick={() => copyCode('update-sub-req')}
                    className="px-3 py-1.5 bg-blue-600 text-white text-xs font-semibold rounded cursor-pointer transition-colors duration-200 hover:bg-blue-700 font-sans"
                  >
                    Copy
                  </button>
                </div>
                <div className="p-4 overflow-x-auto">
                  <pre id="update-sub-req" className="font-mono text-sm text-gray-800 leading-relaxed dark:text-gray-300 text-left whitespace-pre-wrap">
{`{
  "app": "analytics",
  "function": "update_main_and_sub_form_data",
  "main_parameters": {
    "view_id": "256917400006679001",
    "record_id": "256917400006679002",
    "data": {
      "designation": "senior dev",
      "modified_time": "2025-10-30 19:28:09"
    }
  },
  "sub_form_parameters_1": {
    "view_id": "256917400006679039",
    "data": {
      "sub_data": [
        {"sub_designation":"lead dev","sl_no":1},
        {"sub_designation":"architect","sl_no":2}
      ]
    }
  }
}`}
                  </pre>
                </div>
              </div>
              
              <div className="bg-gray-50 border border-gray-200 rounded-lg overflow-hidden dark:bg-gray-900 dark:border-gray-700">
                <div className="px-4 py-3 bg-gray-100 border-b border-gray-200 flex justify-between items-center dark:bg-gray-800 dark:border-gray-700">
                  <span className="text-sm font-semibold text-gray-900 dark:text-white font-sans">Success Response</span>
                  <button 
                    onClick={() => copyCode('update-sub-res')}
                    className="px-3 py-1.5 bg-blue-600 text-white text-xs font-semibold rounded cursor-pointer transition-colors duration-200 hover:bg-blue-700 font-sans"
                  >
                    Copy
                  </button>
                </div>
                <div className="p-4 overflow-x-auto">
                  <pre id="update-sub-res" className="font-mono text-sm text-gray-800 leading-relaxed dark:text-gray-300 text-left whitespace-pre-wrap">
{`{
  "status": "success",
  "code": 200,
  "message": "Record updated (main + sub)"
}`}
                  </pre>
                </div>
              </div>
            </div>

            <p className="text-gray-600 font-semibold mb-4 dark:text-gray-400 font-sans text-left">Failure Response:</p>
            <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
              <div className="bg-gray-50 border border-gray-200 rounded-lg overflow-hidden dark:bg-gray-900 dark:border-gray-700">
                <div className="px-4 py-3 bg-gray-100 border-b border-gray-200 flex justify-between items-center dark:bg-gray-800 dark:border-gray-700">
                  <span className="text-sm font-semibold text-gray-900 dark:text-white font-sans">Update Failed</span>
                  <button 
                    onClick={() => copyCode('update-sub-fail')}
                    className="px-3 py-1.5 bg-blue-600 text-white text-xs font-semibold rounded cursor-pointer transition-colors duration-200 hover:bg-blue-700 font-sans"
                  >
                    Copy
                  </button>
                </div>
                <div className="p-4 overflow-x-auto">
                  <pre id="update-sub-fail" className="font-mono text-sm text-gray-800 leading-relaxed dark:text-gray-300 text-left whitespace-pre-wrap">
{`{
  "status": "failure",
  "code": 404,
  "message": "Record not found or update failed"
}`}
                  </pre>
                </div>
              </div>
            </div>
          </div>

          {/* Get Data */}
          <div id="get-data" className="bg-white border border-gray-200 rounded-xl p-6 mb-6 shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <div className="flex justify-between items-center mb-4">
              <div className="text-lg font-bold text-gray-900 dark:text-white font-sans">Get Data</div>
              <div className="px-3 py-1.5 bg-green-600 text-white text-xs font-bold rounded font-sans">POST</div>
            </div>
            <div className="bg-gray-50 px-4 py-3 rounded-lg font-mono text-sm text-blue-600 mb-4 overflow-x-auto dark:bg-gray-900 dark:text-blue-400 text-left">
              /server/zrubix/zems
            </div>
            <p className="text-gray-600 mb-6 dark:text-gray-400 font-sans text-left">Fetch records for a view using standard parameters.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-gray-50 border border-gray-200 rounded-lg overflow-hidden dark:bg-gray-900 dark:border-gray-700">
                <div className="px-4 py-3 bg-gray-100 border-b border-gray-200 flex justify-between items-center dark:bg-gray-800 dark:border-gray-700">
                  <span className="text-sm font-semibold text-gray-900 dark:text-white font-sans">Request Body</span>
                  <button 
                    onClick={() => copyCode('get-data-req')}
                    className="px-3 py-1.5 bg-blue-600 text-white text-xs font-semibold rounded cursor-pointer transition-colors duration-200 hover:bg-blue-700 font-sans"
                  >
                    Copy
                  </button>
                </div>
                <div className="p-4 overflow-x-auto">
                  <pre id="get-data-req" className="font-mono text-sm text-gray-800 leading-relaxed dark:text-gray-300 text-left whitespace-pre-wrap">
{`{
  "app": "analytics",
  "function": "get_records",
  "last_audit_record_id": "1760794470718",
  "login_id": "Z9187786608481760794120833",
  "user_id": "Z9187786608481760794120833",
  "view_id": "256917400006145001",
  "config": {"responseFormat": "json"}
}`}
                  </pre>
                </div>
              </div>
              
              <div className="bg-gray-50 border border-gray-200 rounded-lg overflow-hidden dark:bg-gray-900 dark:border-gray-700">
                <div className="px-4 py-3 bg-gray-100 border-b border-gray-200 flex justify-between items-center dark:bg-gray-800 dark:border-gray-700">
                  <span className="text-sm font-semibold text-gray-900 dark:text-white font-sans">Success Response</span>
                  <button 
                    onClick={() => copyCode('get-data-res')}
                    className="px-3 py-1.5 bg-blue-600 text-white text-xs font-semibold rounded cursor-pointer transition-colors duration-200 hover:bg-blue-700 font-sans"
                  >
                    Copy
                  </button>
                </div>
                <div className="p-4 overflow-x-auto">
                  <pre id="get-data-res" className="font-mono text-sm text-gray-800 leading-relaxed dark:text-gray-300 text-left whitespace-pre-wrap">
{`{
  "status": "success",
  "code": 200,
  "message": "Records returned",
  "data": []
}`}
                  </pre>
                </div>
              </div>
            </div>
          </div>

          {/* Get Data By Filter */}
          <div id="get-data-filter" className="bg-white border border-gray-200 rounded-xl p-6 mb-6 shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <div className="flex justify-between items-center mb-4">
              <div className="text-lg font-bold text-gray-900 dark:text-white font-sans">Get Data By Filter</div>
              <div className="px-3 py-1.5 bg-green-600 text-white text-xs font-bold rounded font-sans">POST</div>
            </div>
            <div className="bg-gray-50 px-4 py-3 rounded-lg font-mono text-sm text-blue-600 mb-4 overflow-x-auto dark:bg-gray-900 dark:text-blue-400 text-left">
              /server/zrubix/zems
            </div>
            <p className="text-gray-600 mb-6 dark:text-gray-400 font-sans text-left">Retrieve records matching complex criteria.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-gray-50 border border-gray-200 rounded-lg overflow-hidden dark:bg-gray-900 dark:border-gray-700">
                <div className="px-4 py-3 bg-gray-100 border-b border-gray-200 flex justify-between items-center dark:bg-gray-800 dark:border-gray-700">
                  <span className="text-sm font-semibold text-gray-900 dark:text-white font-sans">Request Body</span>
                  <button 
                    onClick={() => copyCode('filter-req')}
                    className="px-3 py-1.5 bg-blue-600 text-white text-xs font-semibold rounded cursor-pointer transition-colors duration-200 hover:bg-blue-700 font-sans"
                  >
                    Copy
                  </button>
                </div>
                <div className="p-4 overflow-x-auto">
                  <pre id="filter-req" className="font-mono text-sm text-gray-800 leading-relaxed dark:text-gray-300 text-left whitespace-pre-wrap">
{`{
  "app": "analytics",
  "function": "get_records_by_filter",
  "view_id": "256917400006145001",
  "config": {
    "responseFormat": "json",
    "criteria": "('is_deleted'='false' and 'is_latest'='true')"
  }
}`}
                  </pre>
                </div>
              </div>
              
              <div className="bg-gray-50 border border-gray-200 rounded-lg overflow-hidden dark:bg-gray-900 dark:border-gray-700">
                <div className="px-4 py-3 bg-gray-100 border-b border-gray-200 flex justify-between items-center dark:bg-gray-800 dark:border-gray-700">
                  <span className="text-sm font-semibold text-gray-900 dark:text-white font-sans">Success Response</span>
                  <button 
                    onClick={() => copyCode('filter-res')}
                    className="px-3 py-1.5 bg-blue-600 text-white text-xs font-semibold rounded cursor-pointer transition-colors duration-200 hover:bg-blue-700 font-sans"
                  >
                    Copy
                  </button>
                </div>
                <div className="p-4 overflow-x-auto">
                  <pre id="filter-res" className="font-mono text-sm text-gray-800 leading-relaxed dark:text-gray-300 text-left whitespace-pre-wrap">
{`{
  "status": "success",
  "code": 200,
  "message": "Filtered records returned",
  "data": []
}`}
                  </pre>
                </div>
              </div>
            </div>
          </div>

          {/* Full Fetch */}
          <div id="full-fetch" className="bg-white border border-gray-200 rounded-xl p-6 mb-6 shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <div className="flex justify-between items-center mb-4">
              <div className="text-lg font-bold text-gray-900 dark:text-white font-sans">Full Fetch</div>
              <div className="px-3 py-1.5 bg-green-600 text-white text-xs font-bold rounded font-sans">POST</div>
            </div>
            <div className="bg-gray-50 px-4 py-3 rounded-lg font-mono text-sm text-blue-600 mb-4 overflow-x-auto dark:bg-gray-900 dark:text-blue-400 text-left">
              /server/zrubix/zems
            </div>
            <p className="text-gray-600 mb-6 dark:text-gray-400 font-sans text-left">Performs a full fetch of records (pagination handled server-side).</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-gray-50 border border-gray-200 rounded-lg overflow-hidden dark:bg-gray-900 dark:border-gray-700">
                <div className="px-4 py-3 bg-gray-100 border-b border-gray-200 flex justify-between items-center dark:bg-gray-800 dark:border-gray-700">
                  <span className="text-sm font-semibold text-gray-900 dark:text-white font-sans">Request Body</span>
                  <button 
                    onClick={() => copyCode('full-req')}
                    className="px-3 py-1.5 bg-blue-600 text-white text-xs font-semibold rounded cursor-pointer transition-colors duration-200 hover:bg-blue-700 font-sans"
                  >
                    Copy
                  </button>
                </div>
                <div className="p-4 overflow-x-auto">
                  <pre id="full-req" className="font-mono text-sm text-gray-800 leading-relaxed dark:text-gray-300 text-left whitespace-pre-wrap">
{`{
  "app": "analytics",
  "function": "get_records_full_fetch",
  "view_id": "256917400006145001",
  "config": {"responseFormat": "json"}
}`}
                  </pre>
                </div>
              </div>
              
              <div className="bg-gray-50 border border-gray-200 rounded-lg overflow-hidden dark:bg-gray-900 dark:border-gray-700">
                <div className="px-4 py-3 bg-gray-100 border-b border-gray-200 flex justify-between items-center dark:bg-gray-800 dark:border-gray-700">
                  <span className="text-sm font-semibold text-gray-900 dark:text-white font-sans">Success Response</span>
                  <button 
                    onClick={() => copyCode('full-res')}
                    className="px-3 py-1.5 bg-blue-600 text-white text-xs font-semibold rounded cursor-pointer transition-colors duration-200 hover:bg-blue-700 font-sans"
                  >
                    Copy
                  </button>
                </div>
                <div className="p-4 overflow-x-auto">
                  <pre id="full-res" className="font-mono text-sm text-gray-800 leading-relaxed dark:text-gray-300 text-left whitespace-pre-wrap">
{`{
  "status": "success",
  "code": 200,
  "message": "Full fetch completed",
  "data": []
}`}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Default Parameters Section */}
        <section id="default-params" className="mb-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3 dark:text-white font-sans">⚙️ Default Body Parameters</h3>
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <p className="text-gray-600 mb-6 dark:text-gray-400 font-sans text-left">Include these parameters in every request (usually set after login).</p>
            
            <div className="overflow-x-auto">
              <table className="w-full bg-white border border-gray-200 rounded-lg overflow-hidden dark:bg-gray-800 dark:border-gray-700">
                <thead>
                  <tr className="bg-gray-100 dark:bg-gray-700">
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-900 dark:text-white font-sans">Parameter</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-900 dark:text-white font-sans">Description</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-900 dark:text-white font-sans">Example Value</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white dark:bg-gray-800">
                    <td className="px-4 py-3 text-sm">
                      <code className="bg-gray-100 px-1.5 py-0.5 rounded text-blue-600 font-mono dark:bg-gray-600 dark:text-blue-400">
                        last_audit_record_id
                      </code>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400 font-sans">Last audit record identifier</td>
                    <td className="px-4 py-3 text-sm">
                      <code className="bg-gray-100 px-1.5 py-0.5 rounded text-blue-600 font-mono dark:bg-gray-600 dark:text-blue-400">
                        '1761380818150'
                      </code>
                    </td>
                  </tr>
                  <tr className="bg-gray-50 dark:bg-gray-700">
                    <td className="px-4 py-3 text-sm">
                      <code className="bg-gray-100 px-1.5 py-0.5 rounded text-blue-600 font-mono dark:bg-gray-600 dark:text-blue-400">
                        login_id
                      </code>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400 font-sans">Session login identifier</td>
                    <td className="px-4 py-3 text-sm">
                      <code className="bg-gray-100 px-1.5 py-0.5 rounded text-blue-600 font-mono dark:bg-gray-600 dark:text-blue-400">
                        'Z9187786608481761377317611'
                      </code>
                    </td>
                  </tr>
                  <tr className="bg-white dark:bg-gray-800">
                    <td className="px-4 py-3 text-sm">
                      <code className="bg-gray-100 px-1.5 py-0.5 rounded text-blue-600 font-mono dark:bg-gray-600 dark:text-blue-400">
                        device_id
                      </code>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400 font-sans">Device identifier</td>
                    <td className="px-4 py-3 text-sm">
                      <code className="bg-gray-100 px-1.5 py-0.5 rounded text-blue-600 font-mono dark:bg-gray-600 dark:text-blue-400">
                        'Z9187786608481761310294745'
                      </code>
                    </td>
                  </tr>
                  <tr className="bg-gray-50 dark:bg-gray-700">
                    <td className="px-4 py-3 text-sm">
                      <code className="bg-gray-100 px-1.5 py-0.5 rounded text-blue-600 font-mono dark:bg-gray-600 dark:text-blue-400">
                        user_id
                      </code>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400 font-sans">User identifier</td>
                    <td className="px-4 py-3 text-sm">
                      <code className="bg-gray-100 px-1.5 py-0.5 rounded text-blue-600 font-mono dark:bg-gray-600 dark:text-blue-400">
                        '1759736522245'
                      </code>
                    </td>
                  </tr>
                  <tr className="bg-white dark:bg-gray-800">
                    <td className="px-4 py-3 text-sm">
                      <code className="bg-gray-100 px-1.5 py-0.5 rounded text-blue-600 font-mono dark:bg-gray-600 dark:text-blue-400">
                        phone
                      </code>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400 font-sans">User phone number</td>
                    <td className="px-4 py-3 text-sm">
                      <code className="bg-gray-100 px-1.5 py-0.5 rounded text-blue-600 font-mono dark:bg-gray-600 dark:text-blue-400">
                        '918778660848'
                      </code>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Error Codes Section */}
        <section id="error-codes" className="mb-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3 dark:text-white font-sans">⚠️ Error Codes</h3>
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <div className="overflow-x-auto">
              <table className="w-full bg-white border border-gray-200 rounded-lg overflow-hidden dark:bg-gray-800 dark:border-gray-700">
                <thead>
                  <tr className="bg-gray-100 dark:bg-gray-700">
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-900 dark:text-white font-sans">Code</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-900 dark:text-white font-sans">Status</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-900 dark:text-white font-sans">Message</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-900 dark:text-white font-sans">Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white dark:bg-gray-800">
                    <td className="px-4 py-3 text-sm">
                      <code className="bg-gray-100 px-1.5 py-0.5 rounded text-blue-600 font-mono dark:bg-gray-600 dark:text-blue-400">
                        200
                      </code>
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <code className="bg-gray-100 px-1.5 py-0.5 rounded text-blue-600 font-mono dark:bg-gray-600 dark:text-blue-400">
                        success
                      </code>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400 font-sans">Success</td>
                    <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400 font-sans">Request processed successfully</td>
                  </tr>
                  <tr className="bg-gray-50 dark:bg-gray-700">
                    <td className="px-4 py-3 text-sm">
                      <code className="bg-gray-100 px-1.5 py-0.5 rounded text-blue-600 font-mono dark:bg-gray-600 dark:text-blue-400">
                        400
                      </code>
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <code className="bg-gray-100 px-1.5 py-0.5 rounded text-blue-600 font-mono dark:bg-gray-600 dark:text-blue-400">
                        failure
                      </code>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400 font-sans">Server Side Issue</td>
                    <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400 font-sans">General API error</td>
                  </tr>
                  <tr className="bg-white dark:bg-gray-800">
                    <td className="px-4 py-3 text-sm">
                      <code className="bg-gray-100 px-1.5 py-0.5 rounded text-blue-600 font-mono dark:bg-gray-600 dark:text-blue-400">
                        401
                      </code>
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <code className="bg-gray-100 px-1.5 py-0.5 rounded text-blue-600 font-mono dark:bg-gray-600 dark:text-blue-400">
                        unauthorized
                      </code>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400 font-sans">Unauthorized Access</td>
                    <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400 font-sans">Missing or invalid credentials</td>
                  </tr>
                  <tr className="bg-gray-50 dark:bg-gray-700">
                    <td className="px-4 py-3 text-sm">
                      <code className="bg-gray-100 px-1.5 py-0.5 rounded text-blue-600 font-mono dark:bg-gray-600 dark:text-blue-400">
                        403
                      </code>
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <code className="bg-gray-100 px-1.5 py-0.5 rounded text-blue-600 font-mono dark:bg-gray-600 dark:text-blue-400">
                        error
                      </code>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400 font-sans">Variable Passing Issue</td>
                    <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400 font-sans">Missing or invalid parameters</td>
                  </tr>
                  <tr className="bg-white dark:bg-gray-800">
                    <td className="px-4 py-3 text-sm">
                      <code className="bg-gray-100 px-1.5 py-0.5 rounded text-blue-600 font-mono dark:bg-gray-600 dark:text-blue-400">
                        404
                      </code>
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <code className="bg-gray-100 px-1.5 py-0.5 rounded text-blue-600 font-mono dark:bg-gray-600 dark:text-blue-400">
                        failure
                      </code>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400 font-sans">No Data Available</td>
                    <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400 font-sans">Resource not found</td>
                  </tr>
                  <tr className="bg-gray-50 dark:bg-gray-700">
                    <td className="px-4 py-3 text-sm">
                      <code className="bg-gray-100 px-1.5 py-0.5 rounded text-blue-600 font-mono dark:bg-gray-600 dark:text-blue-400">
                        429
                      </code>
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <code className="bg-gray-100 px-1.5 py-0.5 rounded text-blue-600 font-mono dark:bg-gray-600 dark:text-blue-400">
                        error
                      </code>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400 font-sans">Too Many Requests</td>
                    <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400 font-sans">Rate limiting applied</td>
                  </tr>
                  <tr className="bg-white dark:bg-gray-800">
                    <td className="px-4 py-3 text-sm">
                      <code className="bg-gray-100 px-1.5 py-0.5 rounded text-blue-600 font-mono dark:bg-gray-600 dark:text-blue-400">
                        500
                      </code>
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <code className="bg-gray-100 px-1.5 py-0.5 rounded text-blue-600 font-mono dark:bg-gray-600 dark:text-blue-400">
                        error
                      </code>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400 font-sans">Internal Server Error</td>
                    <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400 font-sans">Unexpected server error</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>
        </div>
      </main>

      {/* Scroll to Top Button */}
      <button
        onClick={() => { if (mainContentRef.current) mainContentRef.current.scrollTop = 0; }}
        className="fixed bottom-6 right-6 w-12 h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg transition-colors duration-200 flex items-center justify-center z-50 dark:bg-blue-500 dark:hover:bg-blue-600"
        aria-label="Scroll to top"
      >
        <span className="text-xl">↑</span>
      </button>
    </div>
  );
}