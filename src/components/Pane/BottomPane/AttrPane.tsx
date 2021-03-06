import * as React from 'react';
import { Alert } from 'antd';
import IconFont from '../../IconFont/mapgis';
import { LayerType } from '../../../utilities/map/layer';
import IDocument, { Current } from '../../../utilities/map/document';

import BackgroudCard from '../../Card/BackgroundCard';

interface IBottomPaneProps {
    document: IDocument;
}

class AttrPane extends React.Component<IBottomPaneProps, {}> {
    getType(doc) {
        let ui = null;

        let document = new IDocument(doc.name, doc.current, doc.backgrounds, doc.layers, doc.maprender);
        const type = document.current.type;
        const backs = document.getBackgrouds();

        switch (type) {
            case LayerType.BackGround:
                ui = <BackgroudCard backgroud={backs[0]} />
                break;
            case LayerType.RasterTile:

                break;
            case LayerType.VectorTile:

                break;
            case LayerType.UnKnow:

                break;
        }
        return ui;
    }

    //----------------------Menu 菜单相关配置 结束--------------------
    render() {
        const { document } = this.props;
        let message, visible, ui;
        if (!document) {
            message = "没有选中图层！";
            visible = false;
        } else {
            if (document.current && document.current.type) {
                const type = document.current.type
                ui = this.getType(document);
                visible = true;
            } else {
                visible = false;
            }
        }

        return (
            <div >
                {!visible && <Alert message="警告" description={message} type="warning" showIcon />}
                {visible && ui}
            </div >
        );
    }
}


export default AttrPane;
