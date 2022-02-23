import { hierarchy, tree, select, easeLinear, linkRadial } from 'd3';
import d3Wrap from 'react-d3-wrap';

export const RadialTree = d3Wrap({
  initialize(svg, data, options) {},

  update(svg, data, options) {
    const { invokeRoute, getData, isLoading } = options;

    if (!isLoading) {
      // remove the old version
      let animate = false;
      if (select(svg).select('g')) {
        animate = true;
        select(svg).select('g').remove();
      }

      const root = hierarchy(data);
      root.x0 = 0;
      root.y0 = 0;
      root.descendants().forEach((d, i) => {
        d.id = i;
        d._children = d.children;
      });

      const width = 1200;
      const radius = 500;

      const d3Tree = tree()
        .size([2 * Math.PI, radius])
        .separation((a, b) => (a.parent == b.parent ? 1 : 3) / a.depth);

      const d3Svg = select(svg)
        .style('width', '100%')
        .style('height', 'auto')
        .style('padding', '10px')
        .style('box-sizing', 'border-box')
        .style('font', '12px sans-serif');

      const mainGroup = d3Svg.append('g').attr('class', 'main');

      const linkGroup = mainGroup
        .append('g')
        .attr('fill', 'none')
        .attr('stroke', '#555')
        .attr('stroke-opacity', 0.4)
        .attr('stroke-width', 3.5);

      const nodeGroup = mainGroup.append('g');

      const clickNode = (event, d) => {
        const hasChildren = d.children || (d._children && d._children.length > 0) ? true : false;
        if (hasChildren) {
          d.children = d.children ? null : d._children;
          updateTree(true, d);
        } else {
          root.children = root.children ? null : root._children;
          getData();
          updateTree(true, root);
        }
      };
      // const mouseEnterNode = (event, d) => {};
      // const mouseLeaveNode = (event, d) => {};

      // (re)render the tree
      function updateTree(animate, source) {
        let links_data = root.links();
        let nodes_data = root.descendants().reverse();

        d3Tree(root);

        const transition = d3Svg
          .transition()
          .duration(500)
          .ease(easeLinear)
          .attr('viewBox', `${-(width / 2)} ${-(width / 2)} ${width} ${width}`);

        // Update the nodes…
        const nodes = nodeGroup.selectAll('g.node').data(nodes_data, function (d) {
          if (d.parent) {
            return d.parent.data.name + d.data.name;
          }
          return d.data.name;
        });

        const nodeEnter = nodes
          .enter()
          .append('g')
          .attr('class', 'node')
          .attr('cursor', 'pointer')
          .attr('pointer-events', 'all')
          .attr(
            'transform',
            (d) =>
              `
                rotate(${(source.x0 * 180) / Math.PI - 90})
                translate(${source.y0},0)
              `
          )
          .attr('fill-opacity', 0)
          .attr('stroke-opacity', 0)
          .on('click', clickNode)
          .on('mouseenter', function (event, d) {
            select(this).raise();
            select(this)
              .append('g')
              .attr('transform', (d) => `rotate(${-((d.x * 180) / Math.PI - 90)})`);
            select(this).select('g').append('rect').style('fill', 'lightblue').attr('width', 120).attr('height', 120);
            const fo = select(this)
              .select('g')
              .append('foreignObject')
              .attr('x', '10')
              .attr('y', '10')
              .attr('width', '100')
              .attr('height', '100')
              .attr('class', 'svg-tooltip');
            fo.append('xhtml:div')
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

        nodeEnter
          .append('circle')
          .attr('r', 12)
          .style('fill', (d) => (d.data.color ? d.data.color : 'grey'));

        nodeEnter
          .append('text')
          .attr('dy', '0.31em')
          .text((d) => `${d.data.name}`);

        nodeEnter
          .append('foreignObject')
          .attr('x', '10')
          .attr('y', '10')
          .attr('width', '100')
          .attr('height', '100')
          .attr('class', 'svg-foreignObject');

        nodeGroup
          .selectAll('g text')
          // .text((d) => `${d.data.name} - ${d.x} - ${source ? source.x : 0}`)
          .attr('dx', (d) => (d.x < Math.PI === !d.children ? 16 : -16))
          .attr('text-anchor', (d) => (d.x < Math.PI === !d.children ? 'start' : 'end'))
          .attr('transform', (d) => (d.x >= Math.PI ? 'rotate(180)' : null));

        // node update
        nodes
          .merge(nodeEnter)
          .transition(transition)
          .attr('fill-opacity', '1')
          .attr('stroke-opacity', '1')
          .attr(
            'transform',
            (d) =>
              `
                rotate(${(d.x * 180) / Math.PI - 90})
                translate(${d.y},0)
              `
          );
        // : nodeGroup.selectAll('g.node');
        // .on('end', function () {
        //   const box = g.node().getBBox();
        //   console.log({ box });
        //   // treeDiagram.transition().duration(1000).attr('viewBox', `${box.x} ${box.y} ${box.width} ${box.height}`);
        // });

        // node exit
        nodes
          .exit()
          .transition(transition)
          .remove()
          .attr('fill-opacity', '0')
          .attr('stroke-opacity', 0)
          .attr(
            'transform',
            (d) => `
                rotate(${(source.x * 180) / Math.PI - 90})
                translate(${source.y},0)
              `
          );

        // links
        const links = linkGroup
          .selectAll('path')
          .data(links_data, (d) => d.source.data.name + '_' + d.target.data.name);

        // enter
        const linkEnter = links
          .enter()
          .append('path')
          .attr(
            'd',
            linkRadial()
              .angle((d) => source.x0)
              .radius((d) => source.y0)
          );

        // update
        linkGroup
          .selectAll('path')
          .transition(transition)
          .on('end', function () {
            // const box = g.node().getBBox();
            // treeDiagram.transition().duration(1000).attr('viewBox', `${box.x} ${box.y} ${box.width} ${box.height}`);
            nodeGroup
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

        // exit
        links
          .exit()
          .transition(transition)
          .attr(
            'd',
            linkRadial()
              .angle((d) => source.x)
              .radius((d) => source.y)
          )
          .remove();

        root.eachBefore((d) => {
          d.x0 = d.x;
          d.y0 = d.y;
        });
      }

      updateTree(animate, root);
    }
  },

  destroy() {},
});
