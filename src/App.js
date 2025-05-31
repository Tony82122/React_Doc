import React, { useState } from 'react';
import { useStories } from './Hooks/useStories';
import About from './pages/About';
import './App.css';

function App() {
    const { pageData, isLoading, error, setCurrentPage } = useStories();
    const [showAbout, setShowAbout] = useState(false);

    if (isLoading) return <div className="loading">Loading...</div>;
    if (error) return <div className="error">Error: {error}. Please try refreshing the page.</div>;
    if (!pageData) return <div className="no-data">No data available. Please try again later.</div>;

    const stories = pageData.stories || pageData.featuredStories || [];

    return (
        <div className="App">
            <h1>{pageData.title || 'Daily News'}</h1>
            <nav>
                <button onClick={() => setShowAbout(false)}>Home</button>
                <button onClick={() => setShowAbout(true)}>About</button>
                {!showAbout && pageData.navLinks && pageData.navLinks.map((link, index) => (
                    <button key={index} onClick={() => setCurrentPage(link.href.includes('top') ? 'top' : 'all')}>
                        {link.text}
                    </button>
                ))}
            </nav>
            
            {showAbout ? (
                <About />
            ) : (
                <>
                    <h2>{pageData.pageTitle}</h2>
                    {pageData.sectionTitle && (
                        <>
                            <h3>{pageData.sectionTitle}</h3>
                            <p>{pageData.sectionContent}</p>
                        </>
                    )}
                    <div>
                        {stories.length > 0 ? (
                            stories.map((story, index) => (
                                <div key={index} className="story">
                                    <h3>{story.title}</h3>
                                    <p className="department"><strong>Department:</strong> {story.department}</p>
                                    <p>{story.content}</p>
                                </div>
                            ))
                        ) : (
                            <p className="no-data">No stories available at the moment.</p>
                        )}
                    </div>
                </>
            )}
        </div>
    );
}

export default App;