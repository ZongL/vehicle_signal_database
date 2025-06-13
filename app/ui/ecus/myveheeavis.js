import * as veheeavis from 'veheeavis';

export class MyVeheeavis {
    constructor(container, data, styles) {
        this.container = container; 
        this.data = data;
        this.styles = styles;
        this.veheeavisInstance = null;
        this.render();
    }

    render() {
        // 清空容器
        let selector = this.container;
        if (typeof this.container === 'string') {
            document.querySelector(this.container).innerHTML = '';
        } else if (this.container instanceof HTMLElement) {
            this.container.innerHTML = '';
            // 生成唯一ID并赋给DOM
            if (!this.container.id) {
                this.container.id = 'veheeavis-' + Math.random().toString(36).substr(2, 9);
            }
            selector = '#' + this.container.id;
        }
        // 创建新实例
        this.veheeavisInstance = new veheeavis.Ploteeavis({
            container: selector,
            data: this.data,
            styles: this.styles
        });
    }

    updateData(newData) {
        this.data = newData;
        this.render();
    }

    getCurrentState() {
        if (this.veheeavisInstance && typeof this.veheeavisInstance.getCurrentState === 'function') {
            return this.veheeavisInstance.getCurrentState();
        }
        return this.data;
    }
}