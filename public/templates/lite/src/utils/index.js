import React from 'react';

const defaultLoadingComponent = () => null;

function asyncComponent(config) {
    const { resolve } = config;

    return class DynamicComponent extends React.Component {
        constructor(...args) {
            super(...args);
            this.LoadingComponent = config.LoadingComponent || defaultLoadingComponent;
            this.state = {
                AsyncComponent: null,
            };
            this.load();
        }

        componentDidMount() {
            this.mounted = true;
        }

        componentWillUmmount() {
            this.mounted = false;
        }

        load() {
            resolve().then((m) => {
                const AsyncComponent = m.default || m;
                if (this.mounted) {
                    this.setState({
                        AsyncComponent,
                    });
                } else {
                    /* eslint-disable */
                    this.state.AsyncComponent = AsyncComponent;
                    /* eslint-enable */
                }
            });
        }

        render() {
            const { AsyncComponent } = this.state;
            const { LoadingComponent } = this;
            if (AsyncComponent) {
                return <AsyncComponent {...this.props} />
            }
            return <LoadingComponent {...this.props} />
        }
    }
}

export default function dynamic(config) {
    const {
        component: resolveComponent,
    } = config;
    return asyncComponent({
        resolve: config.resolve || function () {
            const component = resolveComponent();
            return new Promise((resolve) => {
                component.then((component) => {
                    return resolve(component);
                });
            });
        },
        ...config,
    });
}
