import React from 'react';
import { observer } from 'mobx-react';
import { useStores } from '../hooks/use-stores';

export default observer(function Sample() {
    const { sampleStore } = useStores();

    return (
        <div>
            <button onClick={sampleStore.handleClick}>Click to add count</button>
            <div>{sampleStore.count}</div>
        </div>
    );
});

