
import React, { Component, useEffect, useState } from 'react';
import { Row, Col, Tab, Nav } from 'react-bootstrap';
import Fade from 'react-reveal/Fade';
import ContentEditable from 'react-contenteditable'
import { Button, Notification } from 'element-react';
import { callGet, callPost } from "../../services/axios";
import { useTranslation } from 'react-i18next';


export default function GeneralInformation () {
	const { t } =useTranslation();
	const [data, setData] = useState({});
	const userType = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user'))?.['roles']?.[0] : null
  

	useEffect(()=>{
		callGet("/api/getGeneralInformationData").then(data1 => {
			setData(JSON.parse(data1.data));
			
		})
	},[])

	// useEffect(()=>{

	// 	Object.entries(data).map(([key,value], i) => {
	// 		if(userType==='ADMIN' && document.getElementById('contentId-'+i)){
	// 			let text = document.getElementById('contentId-'+i);
	// 			text.style.height = '20px'
	// 			text.style.height = (text.scrollHeight) + 'px';
	// 		}
	// 	})

	// },[data])
	const onChangeHandler = (e, key) => {
		var htmlText = e.target.value; 

		let regex = /\<span style="color:#10d3c0 !important">(.*?)\<\/span>/g;
		//var matched = regex.exec(strToMatch);
		let newContent = htmlText;
		let matches = newContent.match(regex);
		if(matches){
			matches.forEach((val)=>{
				let newlyValue = `##${val.replace('<span style="color:#10d3c0 !important">','').replace('</span>','')}##`
				newContent = newContent.replaceAll(val, newlyValue)
			})
		}
		setData({
			...data,
			[key]:newContent
		})
	}

	const viewAsHighlighted = (content) => {
		let regex = /\##(.*?)\##/g;
		let newContent = content;
		let nLinesymbol = '_+_+_+_+';
		let nTabsymbol = '-+-+-+-+';
		let nextLine = '\n';
		let nextTab = '\t'
		let newStrToMatch = content.replace(/\n/g,nLinesymbol).replace(/\t/g,nTabsymbol);
		let matches = newStrToMatch.match(regex);
		if(matches){
			matches.forEach((val)=>{
				val = val.replaceAll(nLinesymbol,nextLine).replaceAll(nTabsymbol, nextTab)
				let newlyValue = `<span style="color:#10d3c0 !important">${val.replaceAll('##','')}</span>`
				newContent = newContent.replaceAll(val, newlyValue)
			})
		}
		return newContent;
	}

	const onInnerChangeHandler = (e, key,innerKey, field) => {
		setData({
			...data,
			[key]:{
				...data[key],
				[innerKey]: {
					...data[key][innerKey],
					[field]: e.target.value
				}
				
			}
		})
	}

	const saveChanges = () => {
		const token = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user'))['accessToken'] : null
		callPost('/api/admin/saveGeneralInformationData', {generalInformationJson: JSON.stringify(data)}, token)
		.then(res => {
			Notification.success({
				title: 'Success',
				message: 'General Information saved!',
				type: 'success',
			  })
		}).catch(err => {
		  console.log('[Fail]', err);
		})
	}
    return (
      <div>

			<Fade>
				<div className="img-box img-box-generll">
				<Fade bottom delay={200}>
					<div style={{ margin: "15% 12% 5% 12%" }}>
						<div className="col-md-7">
							<div className="d-white d-font-black d-text-82">
							{t("generalinfo.General Information")}
							</div>
						</div>
					</div>
				</Fade>
				</div>
			</Fade>
			
			<div style={{ padding: "2% 12% 2% 12%",backgroundColor:"#fff" }} >
					{
						userType==='ADMIN'?<Button onClick={saveChanges} className="fixed top-28 right-10 w-40 h-10 text-gray-50 pt-2" style={{zIndex:2}}>{t("generalinfo.Save changes")}</Button>:''
					}
                {
                    Object.entries(data).map(([key,value], i) => {
						
						if(typeof value==='string' && key==='mainTitle'){
								return	<ContentEditable
										key={i}
										html={value} 
										className="d-content-blue d-font-black d-text-24 h-auto pb-2 pt-2 pl-4 pr-4"
										disabled={userType==='ADMIN'?false:true}
										onChange={(e)=>onChangeHandler(e, key)}  
									/>
						}
						if(typeof value==='string'){
							return	<ContentEditable
										key={i}
										html={viewAsHighlighted(value)} 
										className={`text-white d-content-dark d-text-30 h-auto pb-4 pt-4 pl-4 pr-4  ${i===1?'':'mt-3'}`}
										style={{backgroundColor:"#33454d"}}
										disabled={userType==='ADMIN'?false:true}
										onChange={(e)=>onChangeHandler(e, key)}  
									/>
						}
						if(typeof value==='object'){
							return (
								Object.entries(value).map(([key__,value__], i__) => {
									return (
										<div className="grid grid-flow-col grid-cols-10 mt-2" key={i__}>
											<div className=" text-white d-text-30 col-start-1 col-end-2 d-content-dark w-full p-2 grid " style={{backgroundColor:"#33454d"}}>
												<ContentEditable
													html={value__['name']} 
													className="place-self-center p-3 break-all  text-2xl"
													disabled={userType==='ADMIN'?false:true}
													onChange={(e)=>onInnerChangeHandler(e, key, key__,'name')} 
													tagName='p' 
													/>
											</div>
											<div className=" text-white d-text-30 col-start-2 col-end-5 d-content-dark w-full p-2 grid " style={{backgroundColor:"#33454d"}}>
												<ContentEditable
													html={value__['lifespan']}
													className="place-self-center p-3 break-all"
													disabled={userType==='ADMIN'?false:true}
													onChange={(e)=>onInnerChangeHandler(e, key, key__,'lifespan')} 
													tagName='p' 
													/>
											</div>
											<div className="text-white d-text-30 col-start-5 col-end-11 break-words justify-center d-content-dark w-full p-2 grid " style={{backgroundColor:"#33454d"}}>
												<ContentEditable
													html={value__['purpose']}
													className="place-self-center p-3 break-all"
													disabled={userType==='ADMIN'?false:true}      
													onChange={(e)=>onInnerChangeHandler(e, key, key__,'purpose')}  
													tagName='p'
													/>
											</div>
										</div>
									)
								})
							);
						}


                    })
				}
                  
			</div>
      </div>
    )
  }

