import { hierarchy, tree, select, transition, easeLinear, linkRadial } from 'd3';
// import { data1, data2 } from './data';
import d3Wrap from 'react-d3-wrap';

export const RadialTree = d3Wrap({
  initialize(svg, data, options) {},

  update(svg, data, options) {
    const { invokeRoute, getData, animate } = options;
    // const { height, margin } = dimensions;
    // remove the old version
    if (animate) {
      select(svg).select('g').remove();
    }
    const width = 932;
    const radius = 517.7777777777777;
    // let loadtest = true;
    const treeData = (data) =>
      tree()
        .size([2 * Math.PI, radius])
        .separation((a, b) => (a.parent == b.parent ? 1 : 3) / a.depth)(hierarchy(data));

    const treeDiagram = select(svg)
      .style('width', '100%')
      .style('height', 'auto')
      .style('padding', '10px')
      .style('box-sizing', 'border-box')
      .style('font', '12px sans-serif');

    const g = treeDiagram.append('g');

    const linkgroup = g
      .append('g')
      .attr('fill', 'none')
      .attr('stroke', '#555')
      .attr('stroke-opacity', 0.4)
      .attr('stroke-width', 3.5);

    const nodegroup = g.append('g');
    const trans = (animate) =>
      transition()
        .duration(animate ? 400 : 0)
        .ease(easeLinear)
        .on('end', function () {
          const box = g.node().getBBox();
          treeDiagram.transition().duration(1000).attr('viewBox', `${box.x} ${box.y} ${box.width} ${box.height}`);
        });

    // (re)render the tree
    function newdata(animate = true, thedata = data) {
      let root = treeData(thedata);
      let links_data = root.links();
      console.log({ thedata, root, links_data });

      // update
      let links = linkgroup.selectAll('path').data(links_data, (d) => d.source.data.name + '_' + d.target.data.name);

      // exit
      links.exit().remove();

      // enter
      links
        .enter()
        .append('path')
        .attr(
          'd',
          linkRadial()
            .angle((d) => d.x)
            .radius(10.1)
        );

      // transition
      linkgroup
        .selectAll('path')
        .transition()
        .duration(animate ? 400 : 0)
        .ease(easeLinear)
        .on('end', function () {
          const box = g.node().getBBox();
          treeDiagram.transition().duration(1000).attr('viewBox', `${box.x} ${box.y} ${box.width} ${box.height}`);
          nodegroup
            .selectAll('g text')
            .attr('x', (d) => (d.x < Math.PI === !d.children ? 6 : -6))
            .attr('text-anchor', (d) => (d.x < Math.PI === !d.children ? 'start' : 'end'));
        })
        .attr(
          'd',
          linkRadial()
            .angle((d) => d.x)
            .radius((d) => d.y)
        );

      let nodes_data = root.descendants().reverse();

      let nodes = nodegroup.selectAll('g').data(nodes_data, function (d) {
        if (d.parent) {
          return d.parent.data.name + d.data.name;
        }
        return d.data.name;
      });

      nodes.exit().remove();

      let newnodes = nodes
        .enter()
        .append('g')
        .on('click', function (event, d) {
          select(this).select('g').remove();

          let altChildren = d.data.altChildren || [];
          let children = d.data.children;
          const hasChildren =
            d.children || (children && (children.length > 0 || altChildren.length > 0)) ? true : false;
          d.data.children = altChildren;
          d.data.altChildren = children;
          // if (loadtest) {
          //   if (hasChildren) {
          //     newdata();
          //   } else {
          //     newdata(true, data2);
          //     loadtest = false;
          //   }
          // } else {
          //   if (hasChildren) {
          //     newdata(true, data2);
          //   } else {
          //     newdata();
          //     loadtest = true;
          //   }
          // }
          if (hasChildren) {
            newdata();
          } else {
            select(svg).select('g').remove();
            getData();
          }
          // const newData = await getData();
          // console.log({ newData });
        })
        .on('mouseenter', function (event, d) {
          select(this).raise();
          select(this)
            .append('g')
            .attr(
              'transform',
              (d) => `
            rotate(${-((d.x * 180) / Math.PI - 90)})`
            );
          select(this).select('g').append('rect').style('fill', 'lightblue').attr('width', 120).attr('height', 120);
          const fo = select(this)
            .select('g')
            .append('foreignObject')
            .attr('x', '10')
            .attr('y', '10')
            .attr('width', '100')
            .attr('height', '100')
            .attr('class', 'svg-tooltip');
          const div = fo
            .append('xhtml:div')
            .append('div')
            .attr('class', 'tooltip')
            .append('p')
            .attr('class', 'lead')
            .html('Holmes was certainly not a difficult man to live with.')
            .append('p')
            .attr('class', 'link')
            .attr('color', 'blue')
            .html('view dossier')
            .on('click', function (event, d) {
              invokeRoute('/dossier/1');
            });
        })
        .on('mouseleave', function (event, d) {
          select(this).select('g').remove();
        });

      let allnodes = animate
        ? nodegroup
            .selectAll('g')
            .transition()
            .duration(animate ? 400 : 0)
            .ease(easeLinear)
            .on('end', function () {
              const box = g.node().getBBox();
              treeDiagram.transition().duration(1000).attr('viewBox', `${box.x} ${box.y} ${box.width} ${box.height}`);
            })
        : nodegroup.selectAll('g');

      allnodes.attr(
        'transform',
        (d) => `
        rotate(${(d.x * 180) / Math.PI - 90})
        translate(${d.y},0)
      `
      );

      newnodes
        .append('circle')
        .attr('r', 12)
        .style('fill', (d) => (d.data.color ? d.data.color : 'grey'));

      newnodes
        .append('text')
        .attr('dy', '0.31em')
        .text((d) => (d.data.color ? d.data.color : d.data.name));

      newnodes
        .append('foreignObject')
        .attr('x', '10')
        .attr('y', '10')
        .attr('width', '100')
        .attr('height', '100')
        .attr('class', 'svg-foreignObject');

      nodegroup
        .selectAll('g text')
        .attr('dx', (d) => (d.x < Math.PI === !d.children ? 16 : -16))
        // .text(d => `transformed ${-(d.x * 180 / Math.PI - 90)}`)
        .attr('text-anchor', (d) => (d.x < Math.PI === !d.children ? 'start' : 'end'))
        // .attr("transform", d => `
        // rotate(${-(d.x * 180 / Math.PI - 90)})`)
        .attr('transform', (d) => (d.x >= Math.PI ? 'rotate(180)' : null));
    }

    newdata(animate);
  },

  destroy() {},
});
