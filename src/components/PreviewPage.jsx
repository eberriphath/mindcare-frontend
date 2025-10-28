import React from 'react';
import { Link } from 'react-router-dom';

function PreviewPage({ title, children }) {
    return (
        <div className="min-h-screen bg-gray-50">
            <header className="bg-white border-b">
                <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
                    <div>
                        <h1 className="text-lg font-semibold">{title} (Preview)</h1>
                        <div className="text-xs text-gray-500">This is a public preview — actions are simulated.</div>
                    </div>
                    <div className="flex items-center gap-3">
                        <Link to="/login" className="text-sm text-green-600 hover:underline">Back to Login</Link>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto p-6">
                {children}
            </main>
        </div>
    );
}

export default PreviewPage;
