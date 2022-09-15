import React from 'react';

import SampleStore from '../store/sample.store';

export const storesContext = React.createContext({
    sampleStore: new SampleStore(),
});

