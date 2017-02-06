import React from 'react';
import SigmaNetwork from './SigmaNetwork';


class Network extends React.Component {


    constructor(props: Props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.updateFilterProps = this.updateFilterProps.bind(this);
    }

    componentDidUpdate(prevProps) {
        if (this.props.data !== prevProps.data) {
            this.props.doneLoading();
        }
    }

    handleChange(e) {
        console.log(e.data.node);
        this.props.onChange(e.data.node);
    }

    updateFilterProps(graphProps) {
        this.props.onInitialization(graphProps);
    }


    onGraphLoaded(data) {
        data.nodes.forEach(node => {
            node.articles_s = node.articles.join(", ");
            node.title = node.title === "" ? node.ecli : node.title;
            node.label = node.ecli;

            // layout attributes
            node.x = Math.random();
            node.y = Math.random();
            node.size = 2 * (node.degree);
            node.color = '#000';

        });
        data.edges.forEach(edge => {
            edge.type = "arrow";
            edge.color = '#999';
        });

        return data;
    }

    render() {

        const data = this.onGraphLoaded(this.props.data);
        if (this.props.loading) {
            return null;
        } else {
            return (
                <div className="Network">
                    <SigmaNetwork renderer="canvas" style={{maxWidth:"inherit", height:"700px"}}
                                    graph={data}
                                    settings={{minNodeSize:3, minArrowSize:4, defaultEdgeColor:'#000'}}
                                    onClickNode={this.handleChange} 
                                    updateFilterProps={this.updateFilterProps}
                                    filterState={this.props.filterState}
                                    loading={false}
                                    doneLoading={this.props.doneLoading}
                                    >           
                    </SigmaNetwork>
                </div>
            );
        }
    }
}

export default Network;