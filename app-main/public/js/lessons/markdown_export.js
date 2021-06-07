function ExportToMarkdown() {
	
	//Retrieves the lesson object from localstorage given the lessonID
	this.dataFromLocalStorage = function (lessonID) {
		try {
			return JSON.parse(localStorage.getItem("user")).lessons.filter(
				(lesson) => lesson.id === lessonID
			)[0];
		} catch {
			alert("Something went wrong. The note could not be found!");
		}
	};

	//Takes a lesson object and formats the data to be markdown
	this.formatMarkdown = function (lessonObject) {
		const filename = lessonObject.title;
		let markdown = [];
		const domparser = new DOMParser();
		const parsedDocument = domparser.parseFromString(
			lessonObject.content,
			"text/html"
		);

		//Helper function for retrieving childnodes which are elements only
		const hasElementChild = (element) => {
			let nodeList = element.childNodes;
			if (nodeList.length > 1) {
				let textContent = [...nodeList].reduce((accumulator, item) => {
					if (item.nodeName === "STRONG") {
						accumulator += ` <strong>${item.textContent.trim()}</strong> `;
					} else if (item.nodeName === "EM") {
						accumulator += ` <em>${item.textContent.trim()}</em> `;
					} else if (item.nodeName === "DEL") {
						accumulator += ` <del>${item.textContent.trim()}</del> `;
					} else if (item.nodeName === "U") {
						// Not supported by github
						accumulator += ` <u>${item.textContent.trim()}</u> `;
					} else if (item.nodeType === 3) {
						accumulator += item.nodeValue.trim();
					}
					return accumulator;
				}, "");
				return textContent;
			} else {
				return [...nodeList].filter((node) => {
					return node.nodeType === 1;
				});
			}
		};

		//Maps an htmltag to the correspinding md and pushes to markdown array
		const mapTagToMD = (element) => {
			let md = "";
			if (typeof element === "string") {
				md += element;
			} else {
				switch (element.nodeName) {
					case "SPAN":
						md += headingToMD(element.className, element.textContent);
						break;
					case "BR":
						md += "";
						break;
					case "P":
						md += element.textContent;
						break;
					case "IMG":
						md += `![]()`;
						break;
					case "STRONG":
						md += `**${element.textContent.trim()}**`;
						break;
					case "EM":
						md += `*${element.textContent.trim()}*`;
						break;
					case "PRE":
						if (element.className === "ql-syntax") {
							return [
								{ text: "```", newline: true },
								{ text: element.textContent, newline: false },
								{ text: "```", newline: true },
							];
						}
						break;
				}
			}
			return md;
		};

		const headingToMD = (className, textContent) => {
			switch (className) {
				case "ql-size-small":
					return `<sub>${textContent}</sub>`;
					break;
				case "ql-size-large":
					return `<h2>${textContent}</h2>`;
					break;
				case "ql-size-huge":
					return `<h1>${textContent}</h1>`;
					break;
			}
		};

		//used to retrieve children tags out of their <p> tag parents
		const extractChildren = (element) => {
			let childElement = hasElementChild(element);
			if (typeof childElement === "string") {
				return mapTagToMD(childElement, markdown);
			} else {
				return childElement.length > 0
					? mapTagToMD(childElement[0], markdown)
					: mapTagToMD(element, markdown);
			}
		};
		
		const getImages = (document) => {
			return [...document.body.querySelectorAll("img")];
		};

		const extractBase64FromImage = (imageElement) =>{
			return imageElement.src.replace(/data:.+?,/, "");
		}

		const downloadFile = (filename, data) => {
			const zip = new JSZip();
			const images = getImages(parsedDocument);
			if(images.length>0){
				images.forEach((image,item)=>{
					zip.file(`${item}.jpg`,extractBase64FromImage(image),{base64:true});
				})
				zip.file(`${filename}.md`,data.reduce((string,line)=>{return string+=line},''));
				zip.generateAsync({type:"blob"}).then(function(content) {
					saveAs(content, `${filename}.zip`);
				});
			} else {
				let blob = new Blob(data, {type: "text/plain;charset=utf-8"});
				saveAs(blob,`${filename}.md`);
			}
		};

		let elements = parsedDocument.body.children;
		for (let i = 0; i < elements.length; i++) {
			let mdOfElement = extractChildren(elements[i]);
			if (typeof mdOfElement === "object") {
				//for codeblocks
				mdOfElement.forEach((mdArrayItem) => {
					if (mdArrayItem.newline) {
						markdown.push(mdArrayItem.text + "\n");
					} else {
						markdown.push(mdArrayItem.text);
					}
				});
			} else {
				//for other elements
				markdown.push(mdOfElement + "\n");
			}
		}
		downloadFile(filename,markdown);
	};
}

export default ExportToMarkdown;
