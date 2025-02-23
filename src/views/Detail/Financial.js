import React from 'react'
import {  utilityOptions } from '../../config/constants'
import { useSelector } from 'react-redux';

const Financial = (props) => {
    const t = props.t;
    const product = props.productData;
    
    // const property = useSelector((state) => {console.log(state.productData);})
    // console.log(property.utility);

    // const utility = userSelector((state) =>state.currentUtility)
    // console.log(props.productData);
    let yearlyGrossRent = Number(product.monthlyGrossRent * 12).toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
      })
      let monthlyCosts = Number(product.monthlyCosts).toLocaleString('en-US', { style: 'currency', currency: 'USD', })
      let propertyManagementFee = Number(product.propertyManagementFee).toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
      })
      let platformFee = Number(product.platformFee).toLocaleString('en-US', { style: 'currency', currency: 'USD', })
      let tax = Number(product.tax).toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
      })
      let insuranceFee = Number(product.insuranceFee).toLocaleString('en-US', { style: 'currency', currency: 'USD', })
    //   let utility = utilityOptions.find(item => item.key === product.utility)?.label;
    // //   let utility = 
        let utility
      if(product.utility){
         utility = "Tenant-paid Always"
      }
      let assetPrice = Number(product.assetPrice).toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
      })
      //let fee = Number(product.fee).toLocaleString('en-US', { style: 'currency', currency: 'USD', })
      let initMaintainanceReserve = Number(product.initMaintainanceReserve).toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
      })
      let initialRenovationReserve = Number(product.initialRenovationReserve).toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
      })
  
      let monthlyGrossRent = Number(product.monthlyGrossRent).toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
      })
      let monthlyNetRent = Number(product.monthlyNetRent).toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
      })
      let yearlyNetRent = Number(product.yearlyNetRent).toLocaleString('en-US', { style: 'currency', currency: 'USD', })
      let totalInvestment = Number(product.totalInvestment).toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
      })
      let expectedROI = Number(product.expectedYield).toFixed(2).toLocaleString()
      const projectIRR = Number(product.projectIRR).toFixed(2).toLocaleString();


      const maintenanceExpenses = Number(product.maintenanceExpenses).toLocaleString('en-US', {
          style:'currency',
          currency:'USD'
      });
      const renovationUpgrade = Number(product.renovationUpgrade).toLocaleString('en-US', {
        style:'currency',
        currency:'USD'
    });
        const operatingExpenseReimbursement = Number(product.operatingExpenseReimbursement).toLocaleString('en-US', {
            style:'currency',
            currency:'USD'
        });
        const vacancyReserve = Number(product.vacancyReserve).toLocaleString('en-US', {
            style:'currency',
            currency:'USD'
        });
        const administrativeFee = Number(product.administrativeFee).toLocaleString('en-US', {
            style:'currency',
            currency:'USD'
        });
        const projectedAppreciation = Number(product.projectedAppreciation).toLocaleString('en-US', {
            style:'currency',
            currency:'USD'
        });
    return (
        <div style={{width:"66%"}}>
            <div className="d-text-72 mt-10" style={{borderBottom:"3px solid #0dbfcd"}}>
                Financials
            </div>
            <div style={{margin:"5%"}}>
                <div className="d-flex justify-content-between">
                    <span className="d-text-48">{t("Annual Gross Rent")}</span>
                    <span className="d-text-48" style={{color:"#0dbfcd"}}>{yearlyGrossRent}</span>
                </div>
                <div className="d-flex justify-content-between mt-3">
                    <span className="d-text-48">{t("detail.Monthly Gross Rent")}</span>
                    <span className="d-text-48" style={{color:"#0dbfcd"}}>{monthlyGrossRent}</span>
                </div>
               
            </div>
            <div style={{ borderRadius:5, boxShadow:"4px 3px 22px #aaa"}}>
                <div className="d-flex justify-content-between" style={{borderBottom:"2px solid #0dbfcd", padding:"5% 5% 1%"}}>
                    <span className="d-text-48  ml-2">{t("detail.Monthly Costs")}</span>
                    <span className="d-text-48 " style={{color:"#0dbfcd"}}>{monthlyCosts}</span>
                </div>
                <div style={{padding:"2% 5%", color:"#323a45"}} className="d-text-32">
                    <div className="d-flex justify-content-between mt-3" style={{padding:"0% 2%", borderBottom:"1px solid #EBEBEB"}}>
                        <span >{t("detail.Utilities")}</span>
                        <span >{product.utility}</span>
                    </div>
                    <div className="d-flex justify-content-between mt-3" style={{padding:"0% 2%",borderBottom:"1px solid #EBEBEB"}}>
                        <span >{t("detail.Property Taxes")}</span>
                        <span >{tax}</span>
                    </div>
                    <div className="d-flex justify-content-between mt-3" style={{padding:"0% 2%",borderBottom:"1px solid #EBEBEB"}}>
                        <span >{t("detail.Property Management")}</span>
                        <span >{propertyManagementFee}</span>
                    </div>
                    <div className="d-flex justify-content-between mt-3" style={{padding:"0% 2%",borderBottom:"1px solid #EBEBEB"}}>
                        <span >{t("detail.Maintenance Expenses")}</span>
                        <span >{maintenanceExpenses}</span>
                    </div>
                    <div className="d-flex justify-content-between mt-3" style={{padding:"0% 2%",borderBottom:"1px solid #EBEBEB"}}>
                        <span >{t("detail.Insurance")}</span>
                        <span >{insuranceFee}</span>
                    </div>
                    <div className="d-flex justify-content-between mt-3" style={{padding:"0% 2%",borderBottom:"1px solid #EBEBEB"}}>
                        <span >{t("detail.eSTOKK Marketplace")}</span>
                        <span >{platformFee}</span>
                    </div>
                    <div className="d-flex justify-content-between mt-10" style={{padding:"0% 2%",borderBottom:"2px solid #0dbfcd"}}>
                        <span >{t("detail.Monthly Net rent")}</span>
                        <span >{monthlyNetRent}</span>
                    </div>
                </div>
                
                
               
               
            </div>
            <div style={{margin:"5%"}}>
                <div className="d-flex justify-content-between">
                    <span className="d-text-48 ">{t("Annual Net Rent")}	</span>
                    <span className="d-text-48 " style={{color:"#0dbfcd"}}>{yearlyNetRent}</span>
                </div>
                </div>
            <div style={{ borderRadius:5, boxShadow:"4px 3px 22px #aaa"}} className="pb-10">
                <div className="d-flex justify-content-between" style={{borderBottom:"2px solid #0dbfcd", padding:"5% 5% 1%"}}>
                    <span className="d-text-48  ml-2">{t("Total Investment Value")} </span>
                    <span className="d-text-48 " style={{color:"#0dbfcd"}}>{totalInvestment}</span>
                </div>
                <div style={{padding:"2% 5%", color:"#323a45"}} className="d-text-32">
                    <div className="d-flex justify-content-between mt-3" style={{padding:"0% 2%", borderBottom:"1px solid #EBEBEB"}}>
                        <span >{t("detail.Underlying Asset Price")}</span>
                        <span >{assetPrice}</span>
                    </div>
                    <div className="d-flex justify-content-between mt-3" style={{padding:"0% 2%",borderBottom:"1px solid #EBEBEB"}}>
                        <span >{t("detail.Renovations & Upgrades")}</span>
                        <span >{renovationUpgrade}</span>
                    </div>
                    <div className="d-flex justify-content-between mt-3" style={{padding:"0% 2%",borderBottom:"1px solid #EBEBEB"}}>
                        <span >{t("detail.Operating Expense Reimbursement")}</span>
                        <span >{operatingExpenseReimbursement}</span>
                    </div>
                    <div className="d-flex justify-content-between mt-3" style={{padding:"0% 2%",borderBottom:"1px solid #EBEBEB"}}>
                        <span >{t("detail.Initial Maintenance Reserve")}	</span>
                        <span >{initMaintainanceReserve}</span>
                    </div>
                    <div className="d-flex justify-content-between mt-3" style={{padding:"0% 2%",borderBottom:"1px solid #EBEBEB"}}>
                        <span >{t("Vacancy reserve")}</span>
                        <span >{vacancyReserve}</span>
                    </div>
                    <div className="d-flex justify-content-between mt-3" style={{padding:"0% 2%",borderBottom:"1px solid #EBEBEB"}}>
                        <span >{t("detail.Initial Renovation Reserve")}</span>
                        <span >{initialRenovationReserve}</span>
                    </div>
                    <div className="d-flex justify-content-between mt-3" style={{padding:"0% 2%",borderBottom:"1px solid #EBEBEB"}}>
                        <span >{t("detail.Administrative Fees")}</span>
                        <span >{administrativeFee}</span>
                    </div>
                </div>
            </div>
            <div style={{height:50}}></div>
            <div style={{ borderRadius:5, boxShadow:"4px 3px 22px #aaa"}} className="pb-10">
                <div className="d-flex justify-content-between" style={{borderBottom:"2px solid #0dbfcd", padding:"5% 5% 1%"}}>
                    <span className="d-text-48  ml-2">{t("Expected Income / ROI")}</span>
                    <span className="d-text-48 " style={{color:"#0dbfcd"}}>{expectedROI + "%"}</span>
                </div>
                <div style={{padding:"2% 5%", color:"#323a45"}} className="d-text-32">
                    <div className="d-flex justify-content-between mt-3" style={{padding:"0% 2%", borderBottom:"1px solid #EBEBEB"}}>
                        <span >{t("detail.Projected Appreciation")}</span>
                        <span >{projectedAppreciation + '%'}</span>
                    </div>
                    <div className="d-flex justify-content-between mt-3" style={{padding:"0% 2%",borderBottom:"1px solid #EBEBEB"}}>
                        <span >{t("detail.Total Returns (Projected IRR)")}</span>
                        <span >{projectIRR + "%"}</span>
                    </div>                    
                </div>
            </div>
        </div>
    )
}

export default Financial
