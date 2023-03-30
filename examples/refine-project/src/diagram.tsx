import { useMemo, useState, useCallback } from "react";
import * as gojs from "gojs";
import * as gojsReact from "gojs-react";
gojs.Diagram.licenseKey = "test";

export type Node = {
    id: string;
    label: string;
    neighbors?: Node[];
    links?: Link[];
};
export type Link = { source: string; target: string; label: string };
export type DiagramProps = {
    nodes: Node[];
    links: Link[];
};
class ContinuousForceDirectedLayout extends gojs.ForceDirectedLayout {
    private _isObserving = false;
    isFixed(v: gojs.ForceDirectedVertex): boolean {
        return !!v.node?.isSelected;
    }

    // optimization: reuse the ForceDirectedNetwork rather than re-create it each time
    doLayout(coll: gojs.Diagram | gojs.Group | gojs.Iterable<gojs.Part>) {
        if (!this._isObserving) {
            this._isObserving = true;
            // cacheing the network means we need to recreate it if nodes or links have been added or removed or relinked,
            // so we need to track structural model changes to discard the saved network.
            this.diagram?.addModelChangedListener((e) => {
                // modelChanges include a few cases that we don't actually care about, such as
                // "nodeCategory" or "linkToPortId", but we'll go ahead and recreate the network anyway.
                // Also clear the network when replacing the model.
                if (
                    e.modelChange !== "" ||
                    (e.change === gojs.ChangedEvent.Transaction &&
                        e.propertyName === "StartingFirstTransaction")
                ) {
                    this.network = null;
                }
            });
        }
        let net = this.network;
        if (net === null) {
            // the first time, just create the network as normal
            this.network = net = this.makeNetwork(coll);
        } else {
            // but on reuse we need to update the LayoutVertex.bounds for selected nodes
            this.diagram?.nodes.each((n) => {
                const v = net?.findVertex(n);
                if (v) v.bounds = n.actualBounds;
            });
        }
        // now perform the normal layout
        super.doLayout(coll);
        // doLayout normally discards the LayoutNetwork by setting Layout.network to null;
        // here we remember it for next time
        this.network = net;
    }
}

function initDiagram(): gojs.Diagram {
    const $ = gojs.GraphObject.make; // for conciseness in defining templates

    const diagram = $(gojs.Diagram, {
        initialAutoScale: gojs.Diagram.Uniform, // an initial automatic zoom-to-fit
        contentAlignment: gojs.Spot.Center, // align document to the center of the viewport
        layout: $(
            ContinuousForceDirectedLayout, // automatically spread nodes apart while dragging
            { defaultSpringLength: 30, defaultElectricalCharge: 100 },
        ),
        // do an extra layout at the end of a move
        SelectionMoved: (e) => e.diagram.layout.invalidateLayout(),
        model: new gojs.GraphLinksModel({
            linkKeyProperty: "key", // IMPORTANT! must be defined for merges and data sync when using GraphLinksModel
        }),
    });

    // dragging a node invalidates the Diagram.layout, causing a layout during the drag
    diagram.toolManager.draggingTool.doMouseMove = function () {
        gojs.DraggingTool.prototype.doMouseMove.call(this);
        if (this.isActive) {
            this.diagram.layout.doLayout(true as any);
        }
    };

    // define each Node's appearance
    diagram.nodeTemplate = $(
        gojs.Node,
        "Auto", // the whole node panel
        // define the node's outer shape, which will surround the TextBlock
        $(gojs.Shape, "Circle", {
            fill: "#001628",
            stroke: "black",
            spot1: new gojs.Spot(0, 0, 5, 5),
            spot2: new gojs.Spot(1, 1, -5, -5),
        }),
        $(
            gojs.TextBlock,
            {
                font: "10pt helvetica, bold arial, sans-serif",
                textAlign: "center",
                stroke: "#ffffff",
                maxSize: new gojs.Size(100, NaN),
            },
            new gojs.Binding("text", "text"),
        ),
    );
    // the rest of this app is the same as samples/conceptMap.html

    // replace the default Link template in the linkTemplateMap
    diagram.linkTemplate = $(
        gojs.Link, // the whole link panel
        $(
            gojs.Shape, // the link shape
            { stroke: "black" },
        ),
        $(
            gojs.Shape, // the arrowhead
            { toArrow: "standard", stroke: null },
        ),
        $(
            gojs.Panel,
            "Auto",
            $(
                gojs.Shape, // the label background, which becomes transparent around the edges
                {
                    fill: $(gojs.Brush, "Radial", {
                        0: "rgb(240, 240, 240)",
                        0.3: "rgb(240, 240, 240)",
                        1: "rgba(240, 240, 240, 0)",
                    }),
                    stroke: null,
                },
            ),
            $(
                gojs.TextBlock, // the label text
                {
                    textAlign: "center",
                    font: "10pt helvetica, arial, sans-serif",
                    stroke: "#555555",
                    margin: 4,
                },
                new gojs.Binding("text", "text"),
            ),
        ),
    );
    return diagram;
}

export const GoJS: React.FC<DiagramProps> = ({ nodes, links }) => {
    return (
        <gojsReact.ReactDiagram
            style={{ height: "80vh", width: "100%" }}
            initDiagram={initDiagram}
            divClassName="diagram-component"
            nodeDataArray={nodes.map((n) => ({ key: n.id, text: n.label }))}
            linkDataArray={links.map((l) => ({
                key: l.source + "-" + l.target,
                from: l.source,
                to: l.target,
                text: l.label,
            }))}
            // onModelChange={handleModelChange}
        />
    );
};
