import React, {Component} from "react";
import { useSelector } from "react-redux";


    let linkImages = [
    {name: 'twitter', icon : '/image/Team/icon_1.png'},
    {name: 'facebook', icon : '/image/Team/icon_2.png'},
    {name: 'weibo', icon : '/image/Team/icon_3.png'},
    {name: 'weibo', icon : '/image/Team/icon_4.png'},
    {name: 'weibo', icon : '/image/Team/icon_5.png'},
    {name: 'linkdin', icon : '/image/Team/icon_6.png'},
    {name: 'rarible', icon : '/image/Team/icon_7.png'},
    {name: 'youtube', icon : '/image/Team/icon_8.png'},
    {name: 'discord', icon : '/image/Team/icon_9.png'}
];

export default function ExternalLinks() {
    

    const sitesettings = useSelector(state => state.sitesettings.sitesettingsData);
    
    const setting = sitesettings?.[0];

        return (
            <div style={{width: "100%"}} className="d-flex justify-content-end" >
                {
                    linkImages.map((item, i) => {
                        return <div key={i} style={{borderRadius:"50%", backgroundColor:"#173039", width:36, height:36 }} className="d-flex align-items-center justify-center mr-4">
                            <a href={setting?.[item.name] || '#'} key={i} ><img src={item.icon} style={{width:24}}alt={'footer'}/></a></div>
                    })
                }
            </div>
        )
}
