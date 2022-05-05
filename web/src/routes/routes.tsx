import { Routes, Route } from 'react-router-dom';

import { Home } from '../pages/Home';
import { Repositories } from '../pages/Repositories';

export function Router() {
    return (
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/repositories" element={<Repositories />} />
    </Routes>
    );
}
        