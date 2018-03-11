var __values = (this && this.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
(function () {
    function processReport(id) {
        fetch('/report')
            .then(function (r) { return r.json(); })
            .then(render);
    }
    document.getElementById('report-btn').addEventListener('click', function () {
        var input = document.getElementById('report-input');
        var id = input.value;
        input.value = '';
        processReport(id);
    });
    function normalizeElements(graph) {
        var calculateNodeStrength = function (graph, n) {
            var sum = 0;
            Object.keys(graph[n] || {}).forEach(function (k) {
                sum += graph[n][k] || 0;
            });
            Object.keys(graph)
                .filter(function (k) { return k !== n; })
                .forEach(function (k) {
                sum += graph[k][n] || 0;
            });
            return sum;
        };
        var nodeSet = Object.keys(graph).reduce(function (a, c) {
            a.add(c);
            Object.keys(graph[c]).forEach(function (n) { return a.add(n); });
            return a;
        }, new Set());
        var nodes = [];
        try {
            for (var nodeSet_1 = __values(nodeSet), nodeSet_1_1 = nodeSet_1.next(); !nodeSet_1_1.done; nodeSet_1_1 = nodeSet_1.next()) {
                var n = nodeSet_1_1.value;
                var nodeStrength = calculateNodeStrength(graph, n);
                nodes.push({
                    data: {
                        id: n,
                        name: n,
                        width: Math.max(nodeStrength * 0.8, 30)
                    }
                });
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (nodeSet_1_1 && !nodeSet_1_1.done && (_a = nodeSet_1.return)) _a.call(nodeSet_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        var edges = [];
        Object.keys(graph).forEach(function (k) {
            Object.keys(graph[k]).forEach(function (n) {
                edges.push({
                    data: {
                        id: k + '-' + n,
                        source: k,
                        target: n,
                        weight: graph[k][n]
                    }
                });
            });
        });
        return {
            nodes: nodes,
            edges: edges
        };
        var e_1, _a;
    }
    function render(graph) {
        cytoscape({
            layout: {
                name: 'cose',
                idealEdgeLength: 100,
                nodeOverlap: 100,
                refresh: 20,
                fit: true,
                padding: 10,
                randomize: false,
                componentSpacing: 100,
                nodeRepulsion: 4000000,
                edgeElasticity: 100000,
                nestingFactor: 5,
                gravity: 100,
                numIter: 1000,
                initialTemp: 200,
                coolingFactor: 0.95,
                minTemp: 1.0
            },
            style: cytoscape
                .stylesheet()
                .selector('edge')
                .style({
                width: function (n) {
                    return n.data().weight;
                }
            })
                .selector('node')
                .style({
                width: function (n) {
                    return n.data().width;
                }
            })
                .style({
                height: function (n) {
                    return n.data().width;
                },
                label: function (n) {
                    return n.data().name;
                }
            }),
            container: document.getElementById('canvas'),
            elements: normalizeElements(graph),
            ready: function () {
                window.cy = this;
            }
        });
    }
    processReport('128035004');
})();
//# sourceMappingURL=index.js.map