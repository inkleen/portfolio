import * as d3 from 'd3';
import { draw } from 'https://hub.gitmirror.com/https://raw.githubusercontent.com/inkleen/portfolio/refs/heads/main/renderUtils.js';

/**
 * 生成3d饼图
 * @param {*} id ：id唯一标识
 * @param {*} width ：svg的宽
 * @param {*} height ：svg的高
 * @param {*} data ：要渲染的数据
 * @param {*} x ：横向偏移量
 * @param {*} y ：纵向偏移量
 * @param {*} rx ：饼图的横向半径
 * @param {*} ry ：饼图的纵向半径
 * @param {*} h ：饼图的高度
 */
export default function pie(id,width,height,data,x,y,rx,ry,h) {
    d3.select(id)
        .selectAll('svg')
        .remove();

    const svg = d3
        .select(id)
        .append('svg')
        .attr('width', width)
        .attr('height', height);

    let gId = id.replaceAll('#','');

    svg.append('g').attr('id', gId + 'pie');
    draw(gId + 'pie', data,x,y,rx,ry,h);
}
