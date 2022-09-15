import { action, observable, makeObservable } from 'mobx';

export default class SampleStore {
    constructor() {
        // 这句话必须要加，否则视图无法更新
        makeObservable(this);
    }

    @observable count = 0;

    @action
    handleClick = () => {
        this.count++;
    };
}

