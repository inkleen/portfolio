import * as d3 from 'd3';

export const draw = (
    id, // svg的id】
    data, // 要渲染的数据
    x , // 横向偏移量
    y , // 纵向偏移量
    rx , // 椭圆的x半径
    ry , // 椭圆的y半径
    h , // 饼图的高
    ir = 0 // 饼图的内半径
) => {
    // 生成饼图数据
    const dataset = d3
        .pie()
        .sort(null)
        .value(function(d) {
            return d.value;
        })(data);

    // 获取svg
    const slices = d3
        .select(`#${id}`)
        .append('g')
        .attr('transform', `translate(${x},${y})`)
        .attr('class', 'slices');

    // 环形内曲面
    slices
        .selectAll('.innerSlice')
        .data(dataset)
        .enter()
        .append('path')
        .attr('class', 'innerSlice')
        .style('fill', function(d) {
            return d3.hsl(d.data.color).darker(0.7);
        })
        .attr('d', function(d) {
            return pieInner(d, rx + 0.5, ry + 0.5, h, ir);
        })
        .each(function(d) {
            this._current = d;
        });

    // 上层2d平面
    slices
        .selectAll('.topSlice')
        .data(dataset)
        .enter()
        .append('path')
        .attr('class', 'topSlice')
        .style('fill', function(d) {
            return d.data.color;
        })
        .style('stroke', function(d) {
            return d.data.color;
        })
        .attr('d', function(d) {
            return pieTop(d, rx, ry, ir);
        })
        .each(function(d) {
            this._current = d;
        });


    // 侧面曲面
    slices
        .selectAll('.outerSlice')
        .data(dataset)
        .enter()
        .append('path')
        .attr('class', 'outerSlice')
        .style('fill', function(d) {
            return d3.hsl(d.data.color).darker(0.7);
        })
        .attr('d', function(d) {
            return pieOuter(d, rx - 0.5, ry - 0.5, h);
        })
        .each(function(d) {
            this._current = d;
        });

    // 线条
    slices
        .selectAll('lines')
        .data(dataset)
        .enter()
        .append('line')
        .attr('stroke',d => d.data.color)
        .attr('x1',0)
        .attr('y1', 0)
        .attr('x2', function(d) {
            return 1.5 * rx * Math.cos(0.5 * (d.startAngle + d.endAngle));
        })
        .attr('y2', function(d) {
            return 1.5 * ry * Math.sin(0.5 * (d.startAngle + d.endAngle));
        });

    // 文本
    slices
        .selectAll('desc')
        .data(dataset)
        .enter()
        .append('text')
        .attr('font-weight',900)
        .attr('fill','#ffffff')
        .attr('stroke','#000000')
        .attr('stroke-width','0.5px')
        .attr('transform',d => {
            let x = 1.6 * rx * Math.cos(0.5 * (d.startAngle + d.endAngle));
            let y = 1.6 * ry * Math.sin(0.5 * (d.startAngle + d.endAngle));
            return 'translate(' + x + ',' + y + ')';
        })
        .attr('font-size','12px')
        .attr('text-anchor','middle')
        .text(d => d.data.label);
};


// 生成内曲面
function pieInner(d, rx, ry, h, ir) {
    const startAngle = d.startAngle < Math.PI ? Math.PI : d.startAngle;
    const endAngle = d.endAngle < Math.PI ? Math.PI : d.endAngle;

    const sx = ir * rx * Math.cos(startAngle);
    const sy = ir * ry * Math.sin(startAngle);
    const ex = ir * rx * Math.cos(endAngle);
    const ey = ir * ry * Math.sin(endAngle);

    const ret = [];
    ret.push(
        'M',
        sx,
        sy,
        'A',
        ir * rx,
        ir * ry,
        '0 0 1',
        ex,
        ey,
        'L',
        ex,
        h + ey,
        'A',
        ir * rx,
        ir * ry,
        '0 0 0',
        sx,
        h + sy,
        'z'
    );
    return ret.join(' ');
}

// 生成饼图的顶部
function pieTop(d, rx, ry, ir) {
    if (d.endAngle - d.startAngle === 0) { return 'M 0 0'; }
    const sx = rx * Math.cos(d.startAngle);
    const sy = ry * Math.sin(d.startAngle);
    const ex = rx * Math.cos(d.endAngle);
    const ey = ry * Math.sin(d.endAngle);

    const ret = [];
    ret.push(
        'M',
        sx,
        sy,
        'A',
        rx,
        ry,
        '0',
        d.endAngle - d.startAngle > Math.PI ? 1 : 0,
        '1',
        ex,
        ey,
        'L',
        ir * ex,
        ir * ey
    );
    ret.push(
        'A',
        ir * rx,
        ir * ry,
        '0',
        d.endAngle - d.startAngle > Math.PI ? 1 : 0,
        '0',
        ir * sx,
        ir * sy,
        'z'
    );
    return ret.join(' ');
}

// 外曲面算法
function pieOuter(d, rx, ry, h) {
    const startAngle = d.startAngle > Math.PI ? Math.PI : d.startAngle;
    const endAngle = d.endAngle > Math.PI ? Math.PI : d.endAngle;

    const sx = rx * Math.cos(startAngle);
    const sy = ry * Math.sin(startAngle);
    const ex = rx * Math.cos(endAngle);
    const ey = ry * Math.sin(endAngle);

    const ret = [];
    ret.push(
        'M',
        sx,
        h + sy,
        'A',
        rx,
        ry,
        '0 0 1',
        ex,
        h + ey,
        'L',
        ex,
        ey,
        'A',
        rx,
        ry,
        '0 0 0',
        sx,
        sy,
        'z'
    );
    return ret.join(' ');
}

// 计算扇形所占百分比
function getPercent(d) {
    return d.endAngle - d.startAngle > 0.2
        ? `${Math.round((1000 * (d.endAngle - d.startAngle)) / (Math.PI * 2)) / 10}%`
        : '';
}
