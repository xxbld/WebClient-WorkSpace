import * as React from 'react';
import { Row, Col } from 'antd';
import { connect } from "dva";

import MapRenderer from "../GeoMap/Map/Map";

import { FlowToolbar } from '../../components/Toolbar/EditorToolbar';

import './index.less';

interface IAppProps {
    content: any;
    size?: string; //非必填
    map: any;
    layout: any;
    dispatch: any;
}
interface IAppState {
    id: number;
    isMenuVisible: boolean;
}

class WorkSpaceAntd extends React.Component<IAppProps, IAppState> {
    constructor(props: any) {
        super(props);
    }

    render() {
        let { left, right } = this.props.layout.state;

        let width_left = 4;
        let width_center = 16;
        let width_right = 4;

        if (left && right) {

        } else if (left) {
            width_left = 8;
            width_center = 16;
            width_right = 0;
        } else if (!left) {
            width_left = 1;
            width_center = 22;
            width_right = 1;
        }

        let visibleLeft = width_left > 1 ? true : false;
        let visibleRight = width_right > 0 ? true : false;

        return (
            <div className="editor">
                <Row type="flex" className="editorHd">
                    <Col span={24}>
                        <FlowToolbar />
                    </Col>
                </Row>
                <Row type="flex" className="editorCd">
                    <Col span={width_left} className="editorSidebar">
                        {visibleLeft && <div>Left</div>}
                    </Col>
                    <Col span={width_center} className="editorContent">
                        <MapRenderer
                            style={this.props.map.style}
                            state={this.props.map.state}
                            options={this.props.map.options}
                            layout={this.props.layout}
                        />
                    </Col>

                    {visibleRight && <Col span={width_right} className="editorSidebar">
                        <div ></div>
                    </Col>}

                </Row>
                <Row type="flex" align="bottom" className="editorBd">
                    <Col span={24} className="editorStateBar">
                    </Col>
                </Row>
            </div>
        );
    }

}

function mapStateToProps(state: any, ownProps: any) {
    return {
        content: state.content,
        map: {
            style: state.mapstyle,
            state: state.mapstate,
            options: state.mapoptions
        },
        layout: {
            state: state.layoutstate
        }
    };
}

export default connect(mapStateToProps)(WorkSpaceAntd);