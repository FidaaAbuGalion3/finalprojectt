import React, { useState, useEffect, useRef } from 'react';
import './travelPlanStyle.css';

const API_KEY = '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';

export default function TravelPlan() {
    const [search, setSearch] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [category, setCategory] = useState('');
    const [budget, setBudget] = useState('');
    const [days, setDays] = useState(3);
    const [detailedPlan, setDetailedPlan] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const debounceTimeout = useRef(null);

    useEffect(() => {
        if (search.length < 3) {
            setSuggestions([]);
            return;
        }

        if (debounceTimeout.current) clearTimeout(debounceTimeout.current);

        debounceTimeout.current = setTimeout(async () => {
            try {
                const res = await fetch(
                    `https://api.opentripmap.com/0.1/en/places/autosuggest?name=${encodeURIComponent(
                        search
                    )}&apikey=${API_KEY}`
                );
                const data = await res.json();
                setSuggestions(data.features || []);
            } catch (err) {
                console.error('Error fetching suggestions:', err);
            }
        }, 300);

        return () => clearTimeout(debounceTimeout.current);
    }, [search]);

    const handleSelect = (name) => {
        setSearch(name);
        setSuggestions([]);
    };


    const generateDetailedPlan = async (destinationName, category, budget, daysCount) => {
        // 1. جلب إحداثيات الوجهة
        const resPlace = await fetch(
            `https://api.opentripmap.com/0.1/en/places/geoname?name=${encodeURIComponent(destinationName)}&apikey=${API_KEY}`
        );
        const placeData = await resPlace.json();
        if (!placeData.lat || !placeData.lon) {
            throw new Error('Destination not found');
        }

        const kindsMap = {
            natural: 'natural',
            cultural: 'cultural',
            historical: 'historic',
            fun: 'entertainment',
        };
        const kinds = kindsMap[category] || '';

        const radius = 10000;
        const limit = daysCount * 5;
        const resPlaces = await fetch(
            `https://api.opentripmap.com/0.1/en/places/radius?radius=${radius}&lon=${placeData.lon}&lat=${placeData.lat}&kinds=${kinds}&limit=${limit}&apikey=${API_KEY}`
        );
        const placesData = await resPlaces.json();

        if (!placesData.features || placesData.features.length === 0) {
            throw new Error('No places found');
        }

        const places = placesData.features;
        const perDay = Math.ceil(places.length / daysCount);
        const plan = [];

        for (let i = 0; i < daysCount; i++) {
            const dayPlaces = places.slice(i * perDay, (i + 1) * perDay);
            plan.push({
                day: i + 1,
                activities: dayPlaces.map((p) => p.properties.name),
            });
        }

        return plan;
    };

    const handleGenerate = async () => {
        if (!search) {
            alert('Please select a destination');
            return;
        }
        if (!category) {
            alert('Please select a category');
            return;
        }
        if (!budget) {
            alert('Please select a budget');
            return;
        }

        setLoading(true);
        setError(null);
        setDetailedPlan(null);

        try {
            const plan = await generateDetailedPlan(search, category, budget, days);
            setDetailedPlan(plan);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container">
            <h1>Your Travel Plan</h1>

            <div className="autocomplete">
                <input
                    type="text"
                    placeholder="Search destinations"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    autoComplete="off"
                />
                {suggestions.length > 0 && (
                    <ul className="suggestions">
                        {suggestions.map((item) => (
                            <li
                                key={item.properties.xid}
                                onClick={() => handleSelect(item.properties.name)}
                                className="suggestion-item"
                            >
                                {item.properties.name}
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            <select value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="">Select Category</option>
                <option value="natural">Nature</option>
                <option value="cultural">Culture</option>
                <option value="historical">Historical</option>
                <option value="fun">Fun</option>
            </select>

            <select value={budget} onChange={(e) => setBudget(e.target.value)}>
                <option value="">Select Budget</option>
                <option value="low">Low (&lt; $500)</option>
                <option value="medium">Medium ($500 - $1500)</option>
                <option value="high">High (&gt; $1500)</option>
            </select>

            <label style={{ display: 'block', marginTop: '10px' }}>
                Number of Days:
                <select
                    value={days}
                    onChange={(e) => setDays(parseInt(e.target.value, 10))}
                    style={{ marginLeft: '10px' }}
                >
                    {[1, 2, 3, 4, 5, 6, 7].map((d) => (
                        <option key={d} value={d}>
                            {d}
                        </option>
                    ))}
                </select>
            </label>

            <button onClick={handleGenerate} disabled={loading} style={{ marginTop: '15px' }}>
                {loading ? 'Generating...' : 'Generate Plan'}
            </button>

            {error && <p style={{ color: 'red' }}>Error: {error}</p>}

            {detailedPlan && (
                <div style={{ marginTop: '20px' }}>
                    {detailedPlan.map((dayPlan) => (
                        <div key={dayPlan.day} style={{ marginBottom: '20px' }}>
                            <h3>Day {dayPlan.day}</h3>
                            <ul>
                                {dayPlan.activities.length > 0 ? (
                                    dayPlan.activities.map((act, idx) => <li key={idx}>{act}</li>)
                                ) : (
                                    <li>No activities planned.</li>
                                )}
                            </ul>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
