import * as React from "react";
import {Document} from "../ast";

// circular import...
import render from "../render2";

export default (props: Document) => {
	let {sections} = props;
	
	// let section = sections[0]; 
	
	if(sections.length == 0) {
		return <div>document is empty</div>;
	}
	
	return (
		<div className="marked">
			markdown document yo!
			{sections.map(render)}
		</div>
	);
};

// let Document = React.createClass({
//   renderSections() {
//     let {sections,chosenlang} = this.props;

//     return sections.map(section =>
//       <Section id={section.key} chosenlang={chosenlang} {...section}/>
//     )
//   },

//   // componentDidMount() {
//   //   let hash = window.location.hash;
//   //   if(hash != null) {
//   //     let $e = document.querySelector(hash);
//   //     window.scrollTo(0,$e.offsetTop);
//   //   }
//   // },

//   render() {
//     return (
//       <div className="marked">
//         {this.renderSections()}
//       </div>
//     );
//   }
// });