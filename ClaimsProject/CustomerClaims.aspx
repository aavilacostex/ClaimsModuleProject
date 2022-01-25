﻿<%@ Page Title="Claims Page" Language="vb" AutoEventWireup="true" CodeBehind="CustomerClaims.aspx.vb" MasterPageFile="~/Site.Master" Inherits="ClaimsProject.CustomerClaims" ViewStateMode="Disabled" ValidateRequest="false" %>
<%@ Register Assembly="AjaxControlToolkit" Namespace="AjaxControlToolkit" TagPrefix="Atk" %>

<asp:Content ID="BodyContent" ContentPlaceHolderID="MainContent" runat="server">

    <asp:UpdatePanel ID="updatepnl" runat="server">
        <Triggers>
            <asp:AsyncPostBackTrigger ControlID="hdPartNoSelected" />   
            <asp:AsyncPostBackTrigger ControlID="hdClaimNoSelected" />   
            <asp:AsyncPostBackTrigger ControlID ="ddlSearchReason" />
            <asp:AsyncPostBackTrigger ControlID ="ddlSearchDiagnose" />
            <asp:AsyncPostBackTrigger ControlID ="ddlDiagnoseData"  />
            <asp:AsyncPostBackTrigger ControlID ="ddlLocation"  />            
            <asp:AsyncPostBackTrigger ControlID = "chkConsDamage" />
            <asp:AsyncPostBackTrigger ControlID = "chkPCred" />
            <asp:PostBackTrigger ControlID="btnSaveFile" />
            <%--<asp:PostBackTrigger ControlID="btnGetTemplate" />--%>
            <%--<asp:PostBackTrigger ControlID = "pepe" />--%>
        </Triggers>

        <ContentTemplate>            

            <div class="row">
                <div class="col-md-9"></div>
                <div class="col-md-2">
                    <asp:Label ID="lblUserLogged" Text="" runat="server"></asp:Label>
                </div>
                <div class="col-md-1">
                    <asp:LinkButton ID="lnkLogout" Text="Click to Logout." OnClick="lnkLogout_Click" runat="server"></asp:LinkButton>
                </div>
            </div>

            <div class="container-fluid">
                <div class="breadcrumb-area breadcrumb-bg">
                    <div class="row" style="padding: 10px 0 0 0;">
                        <div class="col-md-9" style="margin: 0 auto;padding: 8px 0 0 0;">
                            <div class="breadcrumb-inner">
                                <div class="row">
                                    <div class="col-md-11">
                                        <div class="bread-crumb-inner" style="margin: 0 auto;">
                                            <div class="breadcrumb-area page-list">
                                                <div class="row">
                                                    <div class="col-md-4"></div>
                                                    <div class="col-md-7 link">                                                        
                                                        <asp:LinkButton ID="lnkHome" class="btn-rounded" OnClick="lnkHome_Click" runat="server">
                                                            <i class="fa fa-map-marker fa-1x"" aria-hidden="true"> </i> Home
                                                        </asp:LinkButton>                                                        
                                                        " - "
                                                    <span>CLAIMS</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="row">
                                <div class="col-md-7">
                                    <asp:LinkButton ID="btnGetTemplate" class="boxed-btn-layout btn-rounded" OnClick="btnGetTemplate_Click" OnClientClick="return test22();" runat="server">
                                                            <i class="fa fa-file-excel-o fa-1x"" aria-hidden="true"> </i> Excel File
                                    </asp:LinkButton>
                                </div>
                                <div class="col-md-3">
                                    <asp:Button id="pepe" class="btn btn-primary btn-lg float-right btnFullSize hideProp" OnClick="pepe_click" OnClientClick="return test22();" Text="Click Here" runat="server"/>
                                    <asp:LinkButton ID="btnImportExcel" class="boxed-btn-layout btn-rounded hideProp" Visible="false" runat="server">
                                                            <i class="fa fa-file-excel-o fa-1x" aria-hidden="true"> </i> IMPORT
                                    </asp:LinkButton>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div id="integratedRow" class="container-fluid">
                <div class="row">
                    <div class="col-md-3">
                        <div id="rowPageSize" class="row hideProp">
                            <div class="col-xs-12 col-sm-3 flex-item-1 padd-fixed">
                                <asp:Label ID="lblText1" Text="Show " runat="server"></asp:Label>
                            </div>
                            <div class="col-xs-12 col-sm-6 flex-item-2 padd-fixed">
                                <asp:DropDownList name="ddlPageSize" ID="ddlPageSize" AutoPostBack="true" OnSelectedIndexChanged="ddlPageSize_SelectedIndexChanged" class="form-control" runat="server"></asp:DropDownList>
                            </div>
                            <div class="col-xs-12 col-sm-3 flex-item-1 padd-fixed">
                                <asp:Label ID="lblText2" Text=" entries." runat="server"></asp:Label>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div id="rowBtnOpt" class="row">
                            <div class="col-xs-12 col-sm-3"></div>
                            <div class="col-xs-12 col-sm-2 flex-item-1 padd-fixed">
                                <asp:Button ID="btnExcel" class="btn btn-primary btn-lg float-right btnFullSize hideProp" runat="server" Text="Excel" />
                            </div>
                            <div class="col-xs-12 col-sm-2 flex-item-2 padd-fixed">
                                <asp:Button ID="btnPdf" class="btn btn-primary btn-lg btnFullSize hideProp" runat="server" Text="Pdf" />
                            </div>
                            <div class="col-xs-12 col-sm-2 flex-item-3 padd-fixed">
                                <asp:Button ID="btnCopy" class="btn btn-primary btn-lg btnFullSize hideProp" runat="server" Text="Copy" />
                            </div>
                            <div class="col-xs-12 col-sm-3"></div>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div id="rowBtnSearch" class="row hideProp">
                            <div class="col-xs-12 col-sm-3 flex-item-1 padd-fixed" style="float: right;">
                                <asp:Label ID="lblSearch" Text="Search: " runat="server" Height="27px"></asp:Label>
                            </div>
                            <div class="col-xs-12 col-sm-5 flex-item-2 padd-fixed">
                                <asp:TextBox name="txtSearch" ID="txtSearch" class="form-control" runat="server"></asp:TextBox>
                            </div>
                            <div class="col-xs-12 col-sm-3 flex-item-2 padd-fixed">
                                <asp:Button name="btnSearch" ID="btnSearch" class="btn btn-primary btn-sm btnFullSize1" Text="Search" runat="server"></asp:Button>
                            </div>
                            <%--<div class="spinner-grow text-warning"></div>--%>
                        </div>
                        <div id="notVisibleKeyPress" style="display: none" runat="server">
                            <asp:Button ID="Button1" runat="server" Text="Button" />
                        </div>
                    </div>
                </div>
            </div>

            <div id="claimQuickOverview" class="container hideProp" runat="server">
                <div class="row">
                    <div class="col-md-1"></div>
                    <div class="col-md-10 alert alert-success">
                        <asp:Label id="lblClaimQuickOverview" Text="" runat="server" ></asp:Label>
                    </div>
                    <div class="col-md-1"></div>
                </div>                
            </div>

            <div id="loadFileSection" class="container hideProp" runat="server">
                <div class="row">
                    <div class="col-md-3"></div>
                    <div class="col-md-6">
                        <div id="pnAddFile" class="shadow-to-box">
                            <div class="row" style="padding: 30px 0;">
                                <div class="col-md-3"></div>
                                <div class="col-md-6"><span id="spnLoadExcel">file to import data</span></div>
                                <div class="col-md-3"></div>
                            </div>
                            <div class="row">
                                <div class="col-md-3"></div>
                                <div class="col-md-6 center-row">
                                    <asp:FileUpload ID="fuOPenEx" CssClass="form-control" runat="server" />
                                </div>
                                <div class="col-md-3"></div>
                            </div>
                            <div class="row" style="padding: 5px 0;">
                                <div class="col-md-3"></div>
                                <div class="col-md-6"><span id="spnTypeFormat">(CSV and XLS formats are allowed)</span></div>
                                <div class="col-md-3"></div>
                            </div>
                            <div class="row" style="padding: 20px 0;">
                                <div class="col-md-3"></div>
                                <div class="col-md-6">
                                    <div class="row">
                                        <div class="col-md-6" style="float: right; text-align: right !important;">
                                            <asp:Button ID="btnSave" Text="Upload" class="btn btn-primary btn-lg btnFullSize" OnClick="btnSave_Click" runat="server" />
                                        </div>
                                        <div class="col-md-6" style="float: left;">
                                            <asp:Button ID="btnBack" Text="   Back   " class="btn btn-primary btn-lg btnFullSize" runat="server" />
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-3"></div>
                            </div>                    
                        </div>
                    </div>
                    <div class="col-md-3"></div>
                </div>        
            </div>

            <%--<div id="AddFilesSection" class="container hideProp" runat="server">
                <div class="row">
                    <div class="col-md-3"></div>
                    <div class="col-md-6">
                        <div id="pnAddClaimFile" class="shadow-to-box">
                            <div class="row" style="padding: 30px 0;">
                                <div class="col-md-3"></div>
                                <div class="col-md-6"><span id="spnAddClaimFile">Select the file to atach to the open claim</span></div>
                                <div class="col-md-3"></div>
                            </div>
                            <div class="row">
                                <div class="col-md-3"></div>
                                <div class="col-md-6 center-row">
                                    <asp:FileUpload ID="fuAddClaimFile" CssClass="form-control" runat="server" />
                                </div>
                                <div class="col-md-3"></div>
                            </div>
                            <div class="row" style="padding: 5px 0;">
                                <div class="col-md-3"></div>
                                <div class="col-md-6"><span id="spnTypeFormatClaimFile">(CSV and XLS formats are allowed)</span></div>
                                <div class="col-md-3"></div>
                            </div>
                            <div class="row" style="padding: 20px 0;">
                                <div class="col-md-3"></div>
                                <div class="col-md-6">
                                    <div class="row">
                                        <div class="col-md-6" style="float: right; text-align: right !important;">
                                            <asp:Button ID="btnSaveFile" Text="Upload" class="btn btn-primary btn-lg btnFullSize" OnClick="btnSaveFile_Click" runat="server" />
                                        </div>
                                        <div class="col-md-6" style="float: left;">
                                            <asp:Button ID="btnBackFile" Text="   Back   " class="btn btn-primary btn-lg btnFullSize" runat="server" />
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-3"></div>
                            </div>                    
                        </div>
                    </div>
                    <div class="col-md-3"></div>
                </div>        
            </div>--%>            

            <div id="searchFilters" class="container-fluid">
                <div id="rowFilters" class="row" runat="server">

                    <%--<div class="col-md-2"></div>--%>
                    <div class="col-md-12">
                        <div class="row">
                            <div class="col-md-3">
                                <asp:Panel ID="pnClaimData" CssClass="pnFilterStyles" GroupingText="General Claims Data" runat="server">
                                    <label>Item Count : </label>
                                    <asp:Label ID="lblTotalClaims" Text="" runat="server" />
                                </asp:Panel>
                            </div>
                            <div class="col-md-6">

                                <asp:Panel ID="pnFilters" CssClass="pnFilterStyles" GroupingText="Claim Filters" runat="server">

                                    <div id="FirstRow">
                                        <div class="row">
                                            <div class="col-md-12">
                                                <div class="form-row">
                                                    <div class="col-md-6">
                                                        <!--search by Claim Number-->
                                                        <div id="rowClaimNo" class="rowClaimNo">                                                            
                                                            <div class="col-md-12" style="margin: 0 auto;"> 
                                                                <asp:Label ID="lblClaimNo" CssClass="control-label" Text="Claim Number" runat="server"></asp:Label>
                                                                <div class="input-group-append">
                                                                    <asp:TextBox ID="txtClaimNo" name="txt-claimNo" placeholder="Claim Number" class="form-control" runat="server"></asp:TextBox>
                                                                    <span class="input-group-addon"><i class="fa fa-hashtag center-vert font-awesome-custom"></i></span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-6">
                                                        <!--search by Part Number-->
                                                        <div id="rowPartNo" class="rowPartNo">                                                            
                                                            <div class="col-md-12" style="margin: 0 auto;">   
                                                                <asp:Label ID="lblPartNo" CssClass="control-label" Text="Part Number" runat="server"></asp:Label>
                                                                <div class="input-group-append">
                                                                    <asp:TextBox ID="txtPartNo" name="txt-partNo" placeholder="Part Number"  class="form-control" runat="server"></asp:TextBox>
                                                                     <span class="input-group-addon"><i class="fa fa-cogs center-vert font-awesome-custom"></i></span>
                                                                </div>                                                            
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div id="SecondRow">
                                        <div class="row">
                                            <div class="col-md-12">
                                                <div class="form-row">
                                                    <!--search by Initial Date-->

                                                    <!-- <div id="rowDateInit" class="rowDateInit"> -->                                                  
                                                    <div class="col-md-6">
                                                        <div id="rowDateInit" class="rowDateInit">                                                            
                                                            <div class="col-md-12" style="margin: 0 auto;"> 
                                                                <asp:Label ID="lblDateInit" CssClass="control-label" Text="Date From" runat="server"></asp:Label>
                                                                <div class="input-group-append">
                                                                    <asp:TextBox ID="txtDateInit" name="txt-dateinit" placeholder=" FROM MM/DD/AAAA" class="form-control autosuggestdateinit" runat="server"></asp:TextBox>
                                                                    <span class="input-group-addon"><i class="fa fa-calendar center-vert font-awesome-custom"></i></span>
                                                                </div>
                                                            </div>                                                        
                                                        </div>
                                                    </div>
                                                
                                                    <div class="col-md-6">
                                                        <div id="rowDateTo" class="rowDateTo">                                                            
                                                            <div class="col-md-12" style="margin: 0 auto;">  
                                                                <asp:Label ID="lblDateTo" CssClass="control-label" Text="Date To" runat="server"></asp:Label>
                                                                <div class="input-group-append">
                                                                    <asp:TextBox ID="txtDateTo" name="txt-dateto" placeholder="TO MM/DD/AAAA" class="form-control autosuggestdateto" runat="server"></asp:TextBox>
                                                                    <span class="input-group-addon"><i class="fa fa-calendar center-vert font-awesome-custom"></i></span>
                                                                </div>
                                                            </div>                                                        
                                                        </div>
                                                    </div>  

                                                </div>
                                                
                                            </div>
                                        </div>
                                    </div>                                   
                                
                                    <div id="ThirdRow">
                                        <div class="row">
                                            <div class="col-md-12">
                                                <div class="form-row">
                                                    <div class="col-md-6">
                                                        <!--search by ExtStatus-->
                                                        <div id="rowExtStatus">                                                            
                                                            <div class="col-md-12" style="margin: 0 auto;">
                                                                <asp:Label ID="lblSearchExtStatus" CssClass="control-label" Text="External Status" runat="server"></asp:Label>
                                                               <div class="input-group-append">
                                                                    <asp:DropDownList ID="ddlSearchExtStatus" name="sel-vndassigned" placeholder="External Status" AutoPostBack="true" class="form-control" OnSelectedIndexChanged="ddlSearchExtStatus_SelectedIndexChanged" title="Search by Ext Status." EnableViewState="true" ViewStateMode="Enabled" runat="server"></asp:DropDownList>
                                                                   <span class="input-group-addon"><i class="fa fa-sign-out-alt center-vert font-awesome-custom"></i></span>
                                                                </div>
                                                            
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-6">
                                                        <!--search by IntStatus-->
                                                        <div id="rowIntStatus">                                                            
                                                            <div class="col-md-12" style="margin: 0 auto;">
                                                                <asp:Label ID="lblSearchIntStatus" CssClass="control-label" Text="Internal Status" runat="server"></asp:Label>
                                                                <div class="input-group-append">
                                                                    <asp:DropDownList ID="ddlSearchIntStatus" name="sel-vndassigned" placeholder="Internal Status" AutoPostBack="true" class="form-control" OnSelectedIndexChanged="ddlSearchIntStatus_SelectedIndexChanged" title="Search by int Status." EnableViewState="true" ViewStateMode="Enabled" runat="server"></asp:DropDownList>
                                                                    <span class="input-group-addon"><i class="fa fa-sign-in-alt center-vert font-awesome-custom"></i></span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div id="FourRow">
                                        <div class="row">
                                            <div class="col-md-12">
                                                <div class="form-row">
                                                    <div class="col-md-6">
                                                        <!--search by Customer-->
                                                        <div id="rowCustomer" class="rowCustomer">                                                            
                                                            <div class="col-md-12" style="margin: 0 auto;">
                                                                <asp:Label ID="lblCustomer" CssClass="control-label" Text="Customer No." runat="server"></asp:Label>
                                                                <div class="input-group-append">
                                                                    <asp:TextBox ID="txtCustomer" name="txt-Customer" placeholder="Customer No." class="form-control" runat="server"></asp:TextBox>
                                                                    <span class="input-group-addon"><i class="fa fa-address-card center-vert font-awesome-custom"></i></span>
                                                                </div>                                                            
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-6">
                                                        <!--search by User-->
                                                        <div id="rowClaimType">                                                            
                                                            <div class="col-md-12" style="margin: 0 auto;">
                                                                <asp:Label ID="lblClaimTypeOk" CssClass="control-label" Text="Claim Type" runat="server"></asp:Label>
                                                                <div class="input-group-append">
                                                                    <asp:DropDownList ID="ddlClaimTypeOk" name="sel-vndassigned" placeholder="Claim Type" AutoPostBack="true" class="form-control" OnSelectedIndexChanged="ddlClaimTypeOk_SelectedIndexChanged" title="Search by Claim Type." EnableViewState="true" ViewStateMode="Enabled" runat="server"></asp:DropDownList>
                                                                    <span class="input-group-addon"><i class="fa fa-user-cog center-vert font-awesome-custom"></i></span>
                                                                </div>                                                            
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div id="FiveRow">
                                        <div class="row">
                                            <div class="col-md-12">
                                                <div class="form-row">
                                                    
                                                    
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div id="SixRow" style="padding: 5px 0 !important;">
                                        <div class="row">
                                            <div class="col-md-12">
                                                <div class="form-row">
                                                    <div class="col-md-6">
                                                        <!--btn search-->
                                                        <asp:Button ID="btnSearchFilter" Text="Search" OnClick="btnSearchFilter_Click" CssClass="btn btn-primary rightCls" runat="server" />
                                                    </div>
                                                    <div class="col-md-6">
                                                        <!--btn clear fields-->
                                                        <asp:Button ID="btnClearFilter" Text="   Clear Filters   " OnClick="btnClearFilter_Click" CssClass="btn btn-primary" runat="server" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div id="SevenRow" style="display:none !important;">
                                        <div class="row">
                                            <div class="col-md-12">
                                                <div class="form-row">
                                                    <div class="col-md-6">
                                                        <!--search by Type-->
                                                        <div id="rowType">
                                                            <div class="col-md-2"></div>
                                                            <div class="col-md-10">
                                                                <label for="sel-vndassigned">Claim Type</label>
                                                                <br>
                                                                <asp:DropDownList ID="ddlClaimType" name="sel-vndassigned" placeholder="Claim Type" class="form-control" OnSelectedIndexChanged="ddlClaimType_SelectedIndexChanged" AutoPostBack="true" title="Search by Claim Type." EnableViewState="true" runat="server"></asp:DropDownList>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-6">

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </asp:Panel>
                            </div>
                            <div class="col-md-3">
                                <asp:Panel ID="pnExtraFilters" CssClass="pnFilterStyles" GroupingText="Additional Filters" runat="server">
                                    
                                    <div id="FirstRowAdd" class="hideProp">
                                        <div class="row">
                                            <div class="col-md-12">
                                                <div class="form-row">
                                                    <div class="col-md-12">
                                                        <!--search by User-->
                                                        <div id="rowUser">                                                            
                                                            <div class="col-md-12" style="margin: 0 auto;">
                                                                <div class="input-group-append">
                                                                    <asp:DropDownList ID="ddlSearchUser" name="sel-vndassigned" placeholder="User Id" AutoPostBack="true" class="form-control"  title="Search by User." EnableViewState="true" ViewStateMode="Enabled" runat="server"></asp:DropDownList>
                                                                    <span class="input-group-addon"><i class="fa fa-user-cog center-vert font-awesome-custom"></i></span>
                                                                </div>
                                                            
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div id="FourRowAdd">
                                        <div class="row">
                                            <div class="col-md-12">
                                                <div class="form-row">
                                                    <div class="col-md-12">
                                                        <!--search by User-->
                                                        <div id="rowUserIR">                                                            
                                                            <div class="col-md-12" style="margin: 0 auto;">
                                                                <asp:Label ID="lblInitRev" CssClass="control-label" Text="Claim Coordinator" runat="server"></asp:Label>
                                                                <div class="input-group-append">
                                                                    <asp:DropDownList ID="ddlInitRev" name="sel-vndassigned"  AutoPostBack="true" class="form-control" OnSelectedIndexChanged="ddlInitRev_SelectedIndexChanged" title="Search by Initial Review User" EnableViewState="true" ViewStateMode="Enabled" runat="server"></asp:DropDownList>
                                                                    <span class="input-group-addon"><i class="fa fa-user-cog center-vert font-awesome-custom"></i></span>
                                                                </div>                                                            
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div id="FiveRowAdd">
                                        <div class="row">
                                            <div class="col-md-12">
                                                <div class="form-row">
                                                    <div class="col-md-12">
                                                        <!--search by User-->
                                                        <div id="rowUserTR">                                                            
                                                            <div class="col-md-12" style="margin: 0 auto;">
                                                                <asp:Label ID="lblTechRev" CssClass="control-label" Text="Tech Review User" runat="server"></asp:Label>
                                                                <div class="input-group-append">
                                                                    <asp:DropDownList ID="ddlTechRev" name="sel-vndassigned" AutoPostBack="true" class="form-control" OnSelectedIndexChanged="ddlTechRev_SelectedIndexChanged" title="Search by Technical Review User" EnableViewState="true" ViewStateMode="Enabled" runat="server"></asp:DropDownList>
                                                                    <span class="input-group-addon"><i class="fa fa-user-cog center-vert font-awesome-custom"></i></span>
                                                                </div>
                                                            
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div id="SecondRowAdd" style="display: none !important;">
                                        <div class="row">
                                            <div class="col-md-12">
                                                <div class="form-row">

                                                    <div class="col-md-12">
                                                        <!--search by reason-->
                                                        <div id="rowReason">                                                            
                                                            <div class="col-md-12" style="margin: 0 auto;">
                                                                <asp:Label ID="lblSearchReason" CssClass="control-label" Text="Reason" runat="server"></asp:Label>
                                                                <div class="input-group-append">
                                                                    <asp:DropDownList ID="ddlSearchReason" name="sel-vndassigned"  AutoPostBack="true" class="form-control"  title="Search by Claim Reason." EnableViewState="true" ViewStateMode="Enabled" runat="server"></asp:DropDownList>
                                                                    <span class="input-group-addon"><i class="fa fa-sliders-h center-vert font-awesome-custom"></i></span>
                                                                </div>                                                            
                                                            </div>
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div id="ThirdRowAdd" style="display: none !important;">
                                        <div class="row">
                                            <div class="col-md-12">
                                                <div class="form-row">

                                                    <div class="col-md-12">
                                                        <!--search by Diagnose-->
                                                        <div id="rowDiagnose">                                                            
                                                            <div class="col-md-12" style="margin: 0 auto;">
                                                                <asp:Label ID="lblSearchDiagnose" CssClass="control-label" Text="Diagnose" runat="server"></asp:Label>
                                                                <div class="input-group-append">
                                                                    <asp:DropDownList ID="ddlSearchDiagnose" name="sel-vndassigned" AutoPostBack="true" class="form-control" B title="Search by Claim Diagnose." EnableViewState="true" ViewStateMode="Enabled" runat="server"></asp:DropDownList>
                                                                    <span class="input-group-addon"><i class="fa fa-briefcase center-vert font-awesome-custom"></i></span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div id="SixRowAdd">
                                        <div class="row">
                                            <div class="col-md-12">
                                                <div class="form-row">

                                                    <div class="col-md-12">
                                                        <!--search by Diagnose-->
                                                        <div id="rowVendor">                                                            
                                                            <div class="col-md-12" style="margin: 0 auto;">
                                                                <asp:Label ID="lblVndNo" CssClass="control-label" Text="Vendor No." runat="server"></asp:Label>
                                                                <div class="input-group-append">
                                                                    <asp:DropDownList ID="ddlVndNo" name="sel-vndassigned" AutoPostBack="true" class="form-control" OnSelectedIndexChanged="ddlVndNo_SelectedIndexChanged" title="Search by Vendor Number." EnableViewState="true" ViewStateMode="Enabled" runat="server"></asp:DropDownList>
                                                                    <span class="input-group-addon"><i class="fa fa-user-tie center-vert font-awesome-custom"></i></span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div id="SevenRowAdd">
                                        <div class="row">
                                            <div class="col-md-12">
                                                <div class="form-row">

                                                    <div class="col-md-12">
                                                        <!--search by Diagnose-->
                                                        <div id="rowLocat">                                                            
                                                            <div class="col-md-12" style="margin: 0 auto;">
                                                                <asp:Label ID="lblLocat" CssClass="control-label" Text="Location" runat="server"></asp:Label>
                                                                <div class="input-group-append">
                                                                    <asp:DropDownList ID="ddlLocat" name="sel-vndassigned" AutoPostBack="true" class="form-control" OnSelectedIndexChanged="ddlLocat_SelectedIndexChanged" title="Search by Location." EnableViewState="true" ViewStateMode="Enabled" runat="server"></asp:DropDownList>
                                                                    <span class="input-group-addon"><i class="fa fa-map-marked-alt center-vert font-awesome-custom"></i></span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                </asp:Panel>
                            </div>
                        </div>
                    </div>
                    <%--<div class="col-md-2"></div>--%>

                    <div style="display: none !important;">
                        <div class="col-md-5">
                            <div class="accordion-wrapper">
                                <div id="accordion_2">
                                    <div class="card">
                                        <div class="card-header" id="headingOne_2">
                                            <h5 class="mb-0">
                                                <a class="collapsed" data-toggle="collapse" data-target="#collapseOne_2" aria-expanded="false" aria-controls="collapseOne_2">
                                                    <span class="">FILTER DATA  <i class="fa fa-angle-down faicon"></i></span>
                                                </a>
                                            </h5>
                                        </div>

                                        <!--FORM TO GET DATA FOR FILTERING DATA-->
                                        <!--ACCORDION CONTENT-->
                                        <div id="collapseOne_2" class="collapse" aria-labelledby="headingOne_2" data-parent="#accordion_2" style="">
                                            <div class="card-body">
                                                <div class="row">

                                                    <div id="claimsbuilder" class="form-group col-md-12">
                                                        <div class="row">
                                                            <div class="col-md-6">
                                                                <label class="form-check">
                                                                    <p>Customer</p>
                                                                    <asp:RadioButton ID="rdCustomer" OnCheckedChanged="rdCustomer_CheckedChanged" onclick="yesnoCheck('rowCustomer');" class="form-check" GroupName="radiofilters" AutoPostBack="true" runat="server"></asp:RadioButton>
                                                                    <span class="checkmark-claims"></span>
                                                                </label>
                                                            </div>
                                                            <div class="col-md-6">
                                                                <label class="form-check">
                                                                    <p>PartNo</p>
                                                                    <asp:RadioButton ID="rdPartNo" OnCheckedChanged="rdPartNo_CheckedChanged" onclick="javascript:yesnoCheck('rowPartNo');" class="form-check" GroupName="radiofilters" AutoPostBack="true" runat="server"></asp:RadioButton>
                                                                    <span class="checkmark-claims"></span>
                                                                </label>
                                                            </div>
                                                        </div>

                                                        <div class="row">
                                                            <div class="col-md-6">
                                                                <label class="form-check">
                                                                    <p>Date</p>
                                                                    <asp:RadioButton ID="rdDate" OnCheckedChanged="rdDate_CheckedChanged" onclick="javascript:yesnoCheck('rowDateInit');" class="form-check" GroupName="radiofilters" AutoPostBack="true" runat="server"></asp:RadioButton>
                                                                    <span class="checkmark-claims"></span>
                                                                </label>
                                                            </div>
                                                            <div class="col-md-6">
                                                                <label class="form-check">
                                                                    <p>ClaimNo</p>
                                                                    <asp:RadioButton ID="rdClaimNo" OnCheckedChanged="rdClaimNo_CheckedChanged" onclick="yesnoCheck('rowClaimNo');" class="form-check" GroupName="radiofilters" AutoPostBack="true" runat="server"></asp:RadioButton>
                                                                    <span class="checkmark-claims"></span>
                                                                </label>
                                                            </div>
                                                        </div>

                                                        <div class="row">
                                                            <div class="col-md-6">
                                                                <label class="form-check">
                                                                    <p>StatusOut</p>
                                                                    <asp:RadioButton ID="rdStatusOut" OnCheckedChanged="rdStatusOut_CheckedChanged" onclick="yesnoCheck('rowExtStatus');" class="form-check" GroupName="radiofilters" AutoPostBack="true" runat="server"></asp:RadioButton>
                                                                    <span class="checkmark-claims"></span>
                                                                </label>
                                                            </div>
                                                            <div class="col-md-6">
                                                                <label class="form-check">
                                                                    <p>StatusIn</p>
                                                                    <asp:RadioButton ID="rdStatusIn" OnCheckedChanged="rdStatusIn_CheckedChanged" onclick="yesnoCheck('rowIntStatus');" class="form-check" GroupName="radiofilters" AutoPostBack="true" runat="server"></asp:RadioButton>
                                                                    <span class="checkmark-claims"></span>
                                                                </label>
                                                            </div>
                                                        </div>

                                                        <div class="row">
                                                            <div class="col-md-6">
                                                                <label class="form-check">
                                                                    <p>User</p>
                                                                    <asp:RadioButton ID="rdUser" OnCheckedChanged="rdUser_CheckedChanged" onclick="yesnoCheck('rowUser');" class="form-check" GroupName="radiofilters" AutoPostBack="true" runat="server"></asp:RadioButton>
                                                                    <span class="checkmark-claims"></span>
                                                                </label>
                                                            </div>
                                                            <div class="col-md-6">
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <!-- cross site forgery's attack avoiding -->
                                                    <div class="col-md-1">
                                                        <input type="hidden" name="csrf" value="b3f24ac9359094f7b4629613138570a6-106b16695033660d3701da01a206aeba">
                                                    </div>

                                                </div>
                                                <div class="row">
                                                    <!-- SUBMIT BUTTON AND CONVERT TO EXCEL THE ACTUAL PAGE -->
                                                    <%--<div id="rowBtnFilters" class="row make-it-flex">--%>

                                                    <div class="col-sm-6" style="float: right;">
                                                        <asp:Button ID="submit" class="btn btn-primary btn-lg float-right btnFullSize" runat="server" Text="Submit" />
                                                    </div>
                                                    <div class="col-sm-6">
                                                        <asp:Button ID="convert" class="btn btn-primary btn-lg btnFullSize" runat="server" Text="Reset" />
                                                    </div>

                                                    <%--</div>--%>
                                                </div>
                                            </div>
                                            <!-- COLLAPSE CONTENT END -->
                                        </div>
                                        <!-- CARD END -->
                                    </div>
                                    <!-- ACCORDION END -->
                                </div>
                            </div>
                        </div>
                        <div class="col-md-1"></div>
                        <div class="col-md-5">
                            <div class="accordion-wrapper">
                                <div id="accordion">
                                    <div class="card">
                                        <!--ACCORDION DEFAULT VALUES HEADER-->
                                        <div class="card-header" id="headingOne">
                                            <h5 class="mb-0">
                                                <a class="collapsed" data-toggle="collapse" data-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                                                    <span class="">GENERAL CLAIMS DATA <i class="fa fa-angle-down faicon"></i></span>
                                                </a>
                                            </h5>
                                        </div>

                                        <!--ACCORDION: CONTENT-->
                                        <div id="collapseOne" class="collapse" aria-labelledby="headingOne" data-parent="#accordion" style="">
                                            <div id="claimsCardBody" class="card-body">
                                                <ul class="checklist">
                                                    <li><i class="fa fa-check"></i>COUNT ITEMS:
                                                    
                                                    
                                                    </li>
                                                </ul>
                                            </div>

                                        </div>
                                        <!-- COLLAPSE CONTENT END -->
                                    </div>
                                    <!-- CARD END -->
                                </div>
                                <!-- ACCORDION END -->
                            </div>
                        </div>
                        <%--<div class="col-md-1"></div>--%>
                    </div>
                    
                </div>

                <div id="hiddenFields" class="row">
                    <asp:HiddenField ID="hiddenId1" Value="0" runat="server" />
                    <asp:HiddenField ID="hiddenId2" Value="0" runat="server" />
                    <asp:HiddenField ID="hiddenName" Value="" runat="server" />
                    <asp:HiddenField ID="hdClaimNoSelected" OnValueChanged="hdClaimNoSelected_ValueChanged" Value="" runat="server" />
                    <asp:HiddenField ID="hdPartNoSelected" OnValueChanged="hdPartNoSelected_ValueChanged" Value="" runat="server" />
                    <asp:HiddenField ID="hdCustomerNoSelected" OnValueChanged="hdCustomerNoSelected_ValueChanged" Value="" runat="server" />
                    <asp:HiddenField ID="hdDateInitSelected" OnValueChanged="hdDateInitSelected_ValueChanged" Value="" runat="server" />
                    <asp:HiddenField ID="hdLinkExpand" value="0" runat="server" />
                    <asp:HiddenField ID="hdTriggeredControl" value="" runat="server" />
                    <asp:HiddenField ID="hdLaunchControl" value="" runat="server" />
                    <asp:HiddenField ID="hdSelectedClass" value="" runat="server" />

                    <asp:HiddenField ID="hdFileImportFlag" Value="0" runat="server" />
                    <asp:HiddenField ID="hdAddClaimFile" Value="0" runat="server" />
                    <asp:HiddenField ID="hdShowTemplate" Value="0" runat="server" />

                    <asp:HiddenField ID="hdReason" Value="" runat="server" />
                    <asp:HiddenField ID="hdDiagnose" Value="" runat="server" />
                    <asp:HiddenField ID="hdStatusOut" Value="" runat="server" />
                    <asp:HiddenField ID="hdStatusIn" Value="" runat="server" />
                    <asp:HiddenField ID="hdUserSelected" Value="" runat="server" />

                    <asp:HiddenField ID="selectedFilter" Value=""  runat="server" />

                    <table id="ndtt" runat="server"></table>
                    <asp:Label ID="lblGrvGroup" Text="" runat="server"></asp:Label>

                    <asp:HiddenField ID="hdGridViewContent" Value="1"  runat="server" />
                    <asp:HiddenField ID="hdNavTabsContent" Value="0"  runat="server" />
                    <asp:HiddenField ID="hdSeeFilesContent" Value="0"  runat="server" />
                    <asp:HiddenField ID="hdAckPopContent" Value="0"  runat="server" />
                    <asp:HiddenField ID="hdInfoCustContent" Value="0"  runat="server" />
                    <asp:HiddenField ID="hdTextEditorAckMessage" Value=""  runat="server" />
                    <asp:HiddenField ID="hdTextEditorInfoCustMessage" Value=""  runat="server" />
                    <asp:HiddenField ID="hdRestockFlag" Value="0"  runat="server" />

                    <asp:HiddenField ID="hdComments" Value="" runat="server" />
                    <asp:HiddenField ID="hdFlagUpload" Value="" runat="server" />
                    <asp:HiddenField ID="hdFlagUploadTxt" Value="" runat="server" />
                    <asp:HiddenField ID="hdmhstde" Value="" runat="server" />
                    <asp:HiddenField ID="hdflgoth" Value="" runat="server" />
                    <asp:HiddenField ID="hdmhwtyp" Value="" runat="server" />
                    <asp:HiddenField ID="hdmhwrea" Value="" runat="server" />
                    <asp:HiddenField ID="hdcwstde" Value="" runat="server" />
                    <asp:HiddenField ID="hdcwdiagd" Value="" runat="server" />
                    <asp:HiddenField ID="hdcmbtxtdiag" Value="" runat="server" />

                    <asp:HiddenField ID="hdCLMemail" Value="" runat="server" />
                    <asp:HiddenField ID="hdCLMuser" Value="" runat="server" />
                    <asp:HiddenField ID="hdCLMLimit" Value="" runat="server" />

                    <asp:HiddenField ID="hdUsrLimitAmt" Value="" runat="server" />
                    <asp:HiddenField ID="hdSwLimitAmt" Value="" runat="server" />

                    <asp:HiddenField ID="hdCurrentActiveTab" Value="" runat="server" />
                    <asp:hiddenField ID="hdSeq" runat="server"></asp:hiddenField>
                    <asp:hiddenField ID="hdClNo" runat="server"></asp:hiddenField>
                    <asp:HiddenField ID="hdlastComment" Value="" runat="server" />
                    <asp:HiddenField ID="chkinitial" Value="" runat="server" />
                    <asp:HiddenField ID="hdWkStatOne" Value="" runat="server" />
                    <asp:HiddenField ID="hdWkStatTwo" Value="" runat="server" />

                    <asp:HiddenField ID="hdSelectedDiagnose" Value="0" runat="server" />
                    <asp:HiddenField ID="hdSelectedDiagnoseIndex" Value="0" runat="server" />
                    <asp:HiddenField ID="hdLocationSelected" Value="0" runat="server" />

                    <asp:HiddenField ID="hdVendorClaimNo" Value="" runat="server" />
                    <asp:HiddenField ID="hdDisplaySeeVndClaim" Value="0" runat="server" /> <!-- To execute the grid events after postback see panels --> 
                    <asp:HiddenField ID="hdDisplayAddVndClaim" Value="0" runat="server" />  <!-- To execute the grid events after postback add panels -->    

                    <asp:HiddenField ID="hdSeeVndComments" Value="0" runat="server" /> <!-- handle the See vendor claim panel div -->
                    <asp:HiddenField ID="hdSeeComments" Value="0" runat="server" /> <!-- handle the See panel div -->
                    <asp:HiddenField ID="hdAddVndComments" Value="0" runat="server" />  <!-- handle the Add vendor claim panel div -->
                    <asp:HiddenField ID="hdAddComments" Value="0" runat="server" />   <!-- handle the Add panel div -->

                    <asp:HiddenField ID="hdGetCommentTab" Value="0" runat="server" />                    
                    <asp:HiddenField ID="hdShowCloseBtn" Value="0" runat="server" />

                    <asp:HiddenField id="hdWelcomeMess" Value="" runat="server" />
                    <asp:HiddenField id="hdVendorNo" Value="" runat="server" />
                    <asp:HiddenField id="hdLocatNo" Value="" runat="server" />
                    <asp:HiddenField id="hdLocatIndex" Value="" runat="server" />
                    <asp:HiddenField id="hdClaimNumber" Value="" runat="server" />
                    <asp:HiddenField id="hdPartialCredits" Value="" runat="server" />

                    <asp:HiddenField id="hdFullDisabled" Value="" runat="server" />
                    <asp:HiddenField id="hdIsReopen" Value="1" runat="server" />
                    <asp:HiddenField id="hdIsReversed" Value="1" runat="server" />
                    <asp:HiddenField id="hdVoided" Value="" runat="server" />
                    <asp:HiddenField ID="IsFullUser" value="" runat="server" />

                    <asp:HiddenField ID="hdLoadAllData" value="0" runat="server" />
                    <asp:HiddenField ID="hdTestPath" value="" runat="server" />
                    <asp:HiddenField ID="hdVariableStatus" value="" runat="server" />
                    <asp:HiddenField ID="hdSelectedHeaderCell" value="" runat="server" />
                    <asp:HiddenField ID="hdNavsForAddDoc" value="" runat="server" />
                    <asp:HiddenField ID="hdChangePageLoad" value="" runat="server" />
                    <asp:HiddenField ID="hdLastCommentValue" value="" runat="server" />
                    <asp:HiddenField ID="hdOnlyReopen" value="" runat="server" />
                    <asp:HiddenField ID="hdShowAckMsgForm" value="0" runat="server" />
                    <asp:HiddenField ID="hdForceCloseBtn" value="" runat="server" />
                    <asp:HiddenField ID="hdConfirmationOption" value="" runat="server" />
                    <asp:HiddenField ID="hdCanClose" value="" runat="server" />

                </div>
            </div>            

            <div id="addProdDev" class="container hideProp" runat="server">
                <div class="row" style="max-width:70% !important;margin: 0 auto !important;">
                    <div class="col-md-12">
                        <div id="pnClaimDetails" class="shadow-to-box">
                            <div class="row" style="padding: 55px 0;">
                                <div class="col-md-1"></div>
                                <div class="col-md-8"><span id="spnClaimDetails">Claim Data</span></div>
                                <div class="col-md-3"></div>
                            </div>
                            <div class="form-row">
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <asp:Label ID="lblWhlCode" CssClass="label-style" Text="Claim No." runat="server"></asp:Label>
                                        <asp:TextBox ID="txtWhlCode" CssClass="form-control fullTextBox" runat="server" />
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <asp:Label ID="lblCreationDate" CssClass="label-style" Text="Submitted By" runat="server"></asp:Label>
                                        <asp:TextBox ID="txtCreationDate" CssClass="form-control fullTextBox" runat="server" />
                                    </div>
                                </div>                                
                            </div>
                            <div class="form-row">
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <asp:Label ID="lblCurrentVendor" CssClass="label-style" Text="Invoice No." runat="server"></asp:Label>
                                        <asp:TextBox ID="txtCurrentVendor" CssClass="form-control fullTextBox" runat="server" />
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <asp:Label ID="lblDescriptionPD" CssClass="label-style" Text="Internal Status" runat="server"></asp:Label>
                                        <asp:TextBox ID="txtDescriptionPD" CssClass="form-control fullTextBox" runat="server" />
                                    </div>
                                </div>
                            </div>
                            <div class="form-row">
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <asp:Label ID="Label1" CssClass="label-style" Text="Description" runat="server"></asp:Label>
                                        <asp:TextBox ID="TextBox1" TextMode="MultiLine" CssClass="form-control fullTextBox" runat="server" />
                                    </div>
                                </div>
                            </div>
                            <div class="form-row">
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <asp:Label ID="Label2" CssClass="label-style" Text="Comments" runat="server"></asp:Label>
                                        <asp:TextBox ID="TextBox2" TextMode="MultiLine" CssClass="form-control fullTextBox" runat="server" />
                                    </div>
                                </div>
                            </div>
                            <div class="form-row">
                                <div class="form-group col-md-3"></div>
                                <div class="form-group col-md-6" style="padding-top: 20px;">
                                    <div class="row">
                                        <div class="col-md-6" style="float: right; text-align: right !important;">
                                            <asp:Button ID="btnCreateProjectPD" Text="create project" class="btn btn-primary btn-lg btnFullSize" runat="server" />
                                        </div>
                                        <div class="col-md-6" style="float: left;">
                                            <asp:Button ID="btnPDBack" Text="   Back   " class="btn btn-primary btn-lg btnFullSize" runat="server" />
                                        </div>
                                    </div>                                    
                                </div>
                                <div class="form-group col-md-3"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div id="gridviewRow" class="container-fluid" runat="server">
                <div class="container-fluid">
                    <div class="panel panel-default">
                        <div class="panel-body">
                            <div class="form-horizontal">

                                <div id="rowGridView">
                                    <asp:GridView ID="grvClaimReport" runat="server" AutoGenerateColumns="false" ShowFooter="false" PageSize="10" 
                                        CssClass="table table-striped table-bordered" AllowPaging="True" DataKeyNames="MHMRNR" GridLines="None"  AllowSorting="true"
                                        OnPageIndexChanging="grvClaimReport_PageIndexChanging" OnRowDataBound="grvClaimReport_RowDataBound" OnRowCommand="grvClaimReport_RowCommand"
                                        OnRowUpdating="grvClaimReport_RowUpdating" OnSorting="grvClaimReport_Sorting" OnRowCreated="grvClaimReport_RowCreated" >
                                        <Columns>                                           
                                            <%--<asp:TemplateField>  removido
                                                <ItemTemplate>
                                                    <asp:LinkButton ID="lnkExpander" runat="server" TabIndex="1" ToolTip="Get Claim Detail" CssClass="click-in" CommandName="show" 
                                                        OnClientClick='<%# String.Format("return divexpandcollapse(this, {0});", Eval("MHMRNR")) %>' >
                                                        <span id="Span1" aria-hidden="true" runat="server">                                                           
                                                            <i class="fa fa-plus"></i>                                                            
                                                        </span>
                                                    </asp:LinkButton>
                                                </ItemTemplate>
                                            </asp:TemplateField>--%>

                                            <asp:TemplateField HeaderText="CLAIM DETAILS" ItemStyle-Width="10px">
                                                <ItemTemplate>
                                                    <asp:LinkButton ID="lnkEdit" runat="server" TabIndex="1" ToolTip="Set Claim Data" CssClass="click-in1" CommandName="claimedit" CommandArgument='<%#Eval("MHMRNR") %>' >
                                                        <span id="Span10" aria-hidden="true" runat="server">                                                           
                                                            <i class="fa fa-edit"></i>                                                            
                                                        </span>
                                                    </asp:LinkButton>
                                                </ItemTemplate>
                                                <ItemStyle Width="20px" VerticalAlign="Middle"></ItemStyle>
                                            </asp:TemplateField>

                                            <asp:BoundField DataField="MHMRNR" HeaderText="CLAIM NUMBER" ItemStyle-Width="10%" SortExpression="mhmrnr"  />
                                            <asp:TemplateField HeaderText="DATE ENTERED" ItemStyle-Width="10%" SortExpression="MHDATE" >
                                                <ItemTemplate>
                                                    <asp:Literal ID="Literal1" runat="server"
                                                        Text='<%#String.Format("{0:MM/dd/yyyy}", System.Convert.ToDateTime(Eval("MHDATE"))) %>'>        
                                                    </asp:Literal>
                                                </ItemTemplate>
                                            </asp:TemplateField> 
                                            <%--<asp:BoundField DataField="MHTDES" HeaderText="TYPE" ItemStyle-Width="11%" />  removido --%>
                                            <asp:BoundField DataField="mhcunr" HeaderText="CUSTOMER" ItemStyle-Width="10%" SortExpression="mhcunr" />
                                            <asp:BoundField DataField="mhcuna" HeaderText="CUSTOMER NAME" ItemStyle-Width="15%" SortExpression="mhcuna" />
                                            <asp:BoundField DataField="mhtomr" HeaderText="CREDIT AMOUNT" ItemStyle-Width="6%" SortExpression="mhtomr" />                                            
                                            <asp:BoundField DataField="mhptnr" HeaderText="PART NUMBER" ItemStyle-Width="6%" SortExpression="mhptnr"   />
                                           <%-- <asp:BoundField DataField="actdt" HeaderText="LAST UPDATE DATE" ItemStyle-Width="15%" />--%> 
                                            <%--<asp:TemplateField HeaderText="LAST UPDATE DATE" ItemStyle-Width="7%" SortExpression="DATE">    removido
                                                <ItemTemplate>
                                                    <asp:Literal ID="Literal10" runat="server"
                                                        Text='<%#String.Format("{0:MM/dd/yyyy}", If(Eval("actdt") <> "", System.Convert.ToDateTime(Eval("actdt")), "N/A")) %>'>        
                                                    </asp:Literal>
                                                </ItemTemplate>
                                            </asp:TemplateField> --%>
                                            <%--<asp:BoundField DataField="mhstde" HeaderText="STATUS" ItemStyle-Width="10%" /> --%> 
                                            <%--<asp:BoundField DataField="INCLNO" HeaderText="INCLNO" ItemStyle-Width="5%" />  --%>   
                                            <asp:BoundField DataField="CWWRNO" HeaderText="docNo" ItemStyle-Width="10%"  ItemStyle-CssClass="hidecol"  HeaderStyle-CssClass="hidecol"  />
                                            <asp:TemplateField HeaderText="STATUS" ItemStyle-Width="13%" >
                                                <ItemTemplate>
                                                    <%--<asp:Label ID="Label12" runat="server" Text='<%# Eval("cwstde").ToString() %>'></asp:Label>--%>
                                                    <asp:Label ID="Label12" runat="server" Text=""></asp:Label>
                                                    <%--</td>  removido
                                                    <tr>
                                                        <td colspan="100%" class="padding0">
                                                            <div id="div<%# Eval("MHMRNR") %>" class="divCustomClass">
                                                                <asp:GridView ID="grvDetails" runat="server" AutoGenerateColumns="false" GridLines="None">
                                                                    <Columns>
                                                                        <asp:BoundField DataField="MHMRNR" HeaderText="CLAIM NUMBER" ItemStyle-Width="5%" />
                                                                        <asp:BoundField DataField="SUBMITTEDBY" HeaderText="SUBMITTED BY" ItemStyle-Width="13%" />
                                                                        <asp:BoundField DataField="INVOICENO" HeaderText="INVOICE NUMBER" ItemStyle-Width="6%" />
                                                                        <asp:BoundField DataField="cwstde" HeaderText="INTSTATUS" ItemStyle-Width="12%" />
                                                                        <asp:BoundField DataField="DESCRIPTION" HeaderText="DESCRIPTION" ItemStyle-Width="19%" />
                                                                        <asp:BoundField DataField="COMMENT1" HeaderText="COMMENT1" ItemStyle-Width="15%" />
                                                                        <asp:BoundField DataField="COMMENT2" HeaderText="COMMENT2" ItemStyle-Width="15%" />
                                                                        <asp:BoundField DataField="COMMENT3" HeaderText="COMMENT3" ItemStyle-Width="15%" />
                                                                    </Columns>
                                                                    <HeaderStyle BackColor="#95B4CA" ForeColor="White" />
                                                                </asp:GridView>
                                                            </div>
                                                        </td>
                                                    </tr>--%>
                                                    <%--<%# MyNewRow(Eval("CLAIM#")) %>--%>                                                   
                                                </ItemTemplate>
                                            </asp:TemplateField>
                                            <asp:TemplateField HeaderText="Last Comment" ItemStyle-Width="23%">
                                                <HeaderStyle CssClass="GridHeaderStyle" />
                                                <ItemStyle CssClass="GridHeaderStyle" />
                                                <HeaderTemplate>Last Comments</HeaderTemplate>
                                                <ItemTemplate>
                                                    <asp:Label ID="lblLastComment" Text="" runat="server"></asp:Label>
                                                </ItemTemplate>
                                            </asp:TemplateField>
                                            <%--<asp:TemplateField>
                                                <ItemTemplate>
                                                    <tr>
                                                        <td colspan="13" class="hideProp">
                                                            <div id='<%# Eval("CLAIM#") %>' class="hideProp"></div>
                                                            <asp:GridView id="grdDetails" AutoGenerateColumns="false" runat="server">
                                                                <Columns>
                                                                    <asp:BoundField DataField="INTSTATUS" HeaderText="INTSTATUS" ItemStyle-Width="8%" />
                                                                </Columns>
                                                            </asp:GridView>
                                                        </td>
                                                    </tr>
                                                </ItemTemplate>
                                            </asp:TemplateField>--%>
                                            <%--<asp:TemplateField HeaderText="Details" ItemStyle-Width="8%">
                                                <HeaderStyle CssClass="GridHeaderStyle" />
                                                <ItemStyle CssClass="GridHeaderStyle" />
                                                <ItemTemplate>
                                                    <asp:LinkButton
                                                        ID="lbClaimDetail"
                                                        runat="server"
                                                        TabIndex="1" CommandName="Detail"
                                                        ToolTip="Get Claim Detail">
                                                        <span id="Span1" aria-hidden="true" runat="server">
                                                            <i class="fa fa-server"></i></span>
                                                    </asp:LinkButton>
                                                </ItemTemplate>
                                            </asp:TemplateField>--%>
                                        </Columns>
                                        <HeaderStyle BackColor="#0063A6" ForeColor="White" />
                                        <PagerSettings Mode="NumericFirstLast" FirstPageText="First" LastPageText="Last" PageButtonCount="10" />
                                        <PagerStyle CssClass="pagination-ys" HorizontalAlign="Center" />
                                        <%--<SortedAscendingHeaderStyle CssClass="header-Asc" />
                                        <SortedDescendingHeaderStyle CssClass="header-Desc" />--%>
                                    </asp:GridView>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <%--<Atk:ModalPopupExtender ID="mdClaimDetailsExp" runat="server" PopupControlID="navsSection" Enabled ="True" TargetControlID="hdModalExtender" CancelControlID="btnClose"  ></Atk:ModalPopupExtender>
             <asp:HiddenField ID="hdModalExtender" Value="" runat="server" />--%>            

            <div id="navsSection" class="container hideProp" runat="server">
                <div class="row">
                    <!-- Tab links -->
                    <ul id="ntab" class="nav nav-tabs" role="tablist" style="visibility: visible;">
                        <li class="nav-item">
                            <a class="nav-link active" data-toggle="tab" href="#claimoverview" role="tab" aria-selected="false">
                                <i class="fa fa-1x fa-file-alt download" aria-hidden="true"> </i> claim overview  
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" data-toggle="tab" href="#partinfo" role="tab" aria-selected="false">
                                <i class="fa fa-1x fa-cog download" aria-hidden="true"> </i>  defective part information                                
                            </a>
                        </li>                        
                        <li class="nav-item">
                            <a class="nav-link" data-toggle="tab" href="#claim-comments" role="tab" aria-selected="false">
                                <i class="fa fa-1x fa-comment download" aria-hidden="true"> </i>  claim comments                                
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" data-toggle="tab" href="#claimstatus" role="tab" aria-selected="false">
                                <i class="fa fa-1x fa-info-circle download" aria-hidden="true"> </i>  status                                
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" data-toggle="tab" href="#claimcredit" role="tab" aria-selected="false">
                                <i class="fa fa-1x fa-file-invoice-dollar download" aria-hidden="true"> </i>  credits                                 
                            </a>
                        </li>
                    </ul>

                    <!-- Tab panes -->
                    <div id="tabc" class="tab-content">

                        <div class="tab-pane active" id="claimoverview">
                            <div class="col-md-12">
                                <h3><asp:Label ID="lblFirstTabDesc" Text="" runat="server"></asp:Label></h3>

                                <div class="row">
                                    <div class="col-md-6">
                                        <asp:Panel ID="pnISDet" GroupingText="Claim Data" runat="server">
                                            <%--<div class="form-row">                                            
                                                <div class="col-md-6">
                                                    <div class="form-group">
                                                        <div class="row">
                                                            <div class="col-sm-2">
                                                                <asp:Label ID="lblClaimNoData" Text="Claim No." CssClass="control-label" runat="server"></asp:Label>
                                                            </div>
                                                            <div class="com-sm-10">
                                                                <asp:TextBox ID="txtClaimNoData" CssClass="form-control" runat="server"></asp:TextBox>
                                                            </div>
                                                        </div>                                                        
                                                    </div>
                                                </div>
                                                <div class="col-md-6">
                                                    <div class="form-group">
                                                        <div class="row">
                                                            <div class="col-sm-2">
                                                                <asp:Label ID="lblClaimType" Text="Claim Type" CssClass="control-label" runat="server"></asp:Label>
                                                            </div>
                                                            <div class="col-sm-10">
                                                                <asp:TextBox ID="txtClaimType" CssClass="form-control" runat="server"></asp:TextBox>
                                                            </div>
                                                        </div>                                                        
                                                    </div>
                                                </div>                                                                                       
                                            </div>--%>

                                            <div class="form-row">
                                                <div class="col-md-6">                                                    
                                                    <asp:Label ID="lblClaimNoData" Text="Claim No." CssClass="control-label" runat="server"> </asp:Label>
                                                    <asp:TextBox ID="txtClaimNoData" CssClass="form-control" runat="server"></asp:TextBox>                                                                                                    
                                                </div>
                                                <div class="col-md-6">
                                                    <asp:Label ID="lblClaimType" Text="Claim Type" CssClass="control-label" runat="server"></asp:Label>
                                                    <asp:TextBox ID="txtClaimType" CssClass="form-control" runat="server"></asp:TextBox>
                                                </div>
                                            </div>

                                            <div class="form-row">
                                                <div class="col-md-6">
                                                    <asp:Label ID="lblPartNoData" Text="Part No." CssClass="control-label" runat="server"></asp:Label>
                                                    <div class="form-row">
                                                        <div class="col-md-9">
                                                            <asp:TextBox ID="txtPartNoData" CssClass="form-control" runat="server"></asp:TextBox>
                                                        </div>
                                                        <div class="col-md-3 pleft0">
                                                            <asp:Button ID="btnChangePart" CssClass="btn btn-primary btnpadding btnAdjustSize" OnClick="btnChangePart_Click" Text="Change" runat="server" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-md-6">
                                                    <asp:Label ID="lblPartDescription" Text="Part Desc." CssClass="control-label" runat="server"></asp:Label>
                                                    <asp:TextBox ID="txtPartDescription" CssClass="form-control" runat="server"></asp:TextBox>
                                                </div>
                                            </div>

                                            <div class="form-row">
                                                <div class="col-md-6">
                                                    <asp:Label ID="lblEnteredBy" Text="Entered By" CssClass="control-label" runat="server"></asp:Label>
                                                    <asp:TextBox ID="txtEnteredBy" CssClass="form-control" runat="server"></asp:TextBox>
                                                </div>
                                                <div class="col-md-6">
                                                    <asp:Label ID="lblDateEntered" Text="Date Entered" CssClass="control-label" runat="server"></asp:Label>
                                                    <asp:TextBox ID="txtDateEntered" CssClass="form-control" runat="server"></asp:TextBox>
                                                </div>                                                
                                            </div>

                                            <div class="form-row">
                                                <div class="col-md-6">
                                                    <asp:Label ID="lblQty" Text="QTY" CssClass="control-label" runat="server"></asp:Label>
                                                    <asp:TextBox ID="txtQty" CssClass="form-control" runat="server"></asp:TextBox>
                                                </div>
                                                <div class="col-md-6">
                                                    <asp:Label ID="lblUnitCost" Text="Unit Cost" CssClass="control-label" runat="server"></asp:Label>
                                                    <asp:TextBox ID="txtUnitCost" CssClass="form-control" runat="server"></asp:TextBox>
                                                </div>
                                            </div>

                                            <div class="form-row">
                                                <div class="col-md-6">
                                                    <asp:Label ID="lblInvoiceNo" Text="Invoice No." CssClass="control-label" runat="server"></asp:Label>
                                                    <asp:TextBox ID="txtInvoiceNo" CssClass="form-control" runat="server"></asp:TextBox>
                                                </div>
                                                <div class="col-md-6">
                                                    <asp:Label ID="lblInvoiceDate" Text="Invoice Date" CssClass="control-label" runat="server"></asp:Label>
                                                    <asp:TextBox ID="txtInvoiceDate" CssClass="form-control" runat="server"></asp:TextBox>
                                                </div>
                                            </div>

                                            <div class="form-row">
                                                <div class="col-md-6">
                                                    <asp:Label ID="lblEnteredFrom" Text="Entered From" CssClass="control-label" runat="server"></asp:Label>
                                                    <asp:TextBox ID="txtEnteredFrom" CssClass="form-control" runat="server"></asp:TextBox>
                                                </div>
                                                <div class="col-md-6">                                                    
                                                    <%--<asp:Label ID="lblSeq" CssClass="control-label" runat="server"></asp:Label>--%>                                                    
                                                    <asp:Label ID="lblLocation" Text="Location" CssClass="control-label" runat="server"></asp:Label>
                                                    <asp:DropDownList ID="ddlLocation" CssClass="form-control" EnableViewState="true" ViewStateMode="Enabled" runat="server" />
                                                    <%--<asp:TextBox ID="txtLocation" CssClass="form-control" runat="server"></asp:TextBox>--%>                                                    
                                                </div>
                                            </div>

                                            <div class="form-row">
                                                <div class="col-md-6">
                                                    <asp:Label ID="lblInstDate" Text="Installation Date" CssClass="control-label" runat="server"></asp:Label>
                                                    <asp:TextBox ID="txtInstDate" CssClass="form-control cData" runat="server"></asp:TextBox>
                                                </div>
                                                <div class="col-md-6">
                                                    <asp:Label ID="lblHWorked" Text="Hours Worked" CssClass="control-label" runat="server"></asp:Label>
                                                    <asp:TextBox ID="txtHWorked" CssClass="form-control cData" runat="server"></asp:TextBox>
                                                </div>
                                            </div>                                            

                                            <div class="form-row last">
                                                <div class="col-md-12">
                                                    <asp:Label ID="lblCustStatement" Text="Customer's Statement" CssClass="control-label" runat="server"></asp:Label>
                                                    <asp:TextBox ID="txtCustStatement" CssClass="form-control cData" TextMode="MultiLine" runat="server"></asp:TextBox>
                                                </div>
                                            </div>

                                        </asp:Panel> 
                                    </div>
                                    <div class="col-md-3">
                                        <asp:Panel ID="pnContact" GroupingText="Customer Info" runat="server">
                                            
                                            <div class="form-row">
                                                <div class="col-md-12">
                                                    <asp:Label ID="lblCustomerData" Text="Customer No." CssClass="control-label" runat="server"></asp:Label>
                                                    <asp:TextBox ID="txtCustomerData" CssClass="form-control" runat="server"></asp:TextBox>
                                                </div>                                                
                                            </div>

                                            <div class="form-row">
                                                <div class="col-md-12">
                                                    <asp:Label ID="lblCustomerName" Text="Customer Name" CssClass="control-label" runat="server"></asp:Label>
                                                    <asp:TextBox ID="txtCustomerName" CssClass="form-control" runat="server"></asp:TextBox>
                                                </div>
                                            </div>

                                            <div class="form-row">
                                                <div class="col-md-12">
                                                    <asp:Label ID="lblContactName" Text="Contact Name" CssClass="control-label" runat="server"></asp:Label>
                                                    <asp:TextBox ID="txtContactName" CssClass="form-control cData" runat="server"></asp:TextBox>
                                                </div>                                                
                                            </div>

                                            <div class="form-row">
                                                <div class="col-md-12">
                                                    <asp:Label ID="lblContactPhone" Text="Contact Phone" CssClass="control-label" runat="server"></asp:Label>
                                                    <asp:TextBox ID="txtContactPhone" CssClass="form-control cData" runat="server"></asp:TextBox>
                                                </div>
                                            </div>

                                            <div class="form-row last">
                                                <div class="col-md-12">
                                                    <asp:Label ID="lblContactEmail" Text="Contact Email" CssClass="control-label" runat="server"></asp:Label>
                                                    <asp:TextBox ID="txtContactEmail" CssClass="form-control cData" runat="server"></asp:TextBox>
                                                </div>                                                
                                            </div>

                                        </asp:Panel>
                                    </div>
                                    <div class="col-md-3">
                                        <asp:Panel ID="pnInformation" GroupingText="Information" runat="server">                                                                                      
                                                
                                             <h5>Equipment</h5>
                                            <div class="form-row">                                               
                                                <div class="col-md-12">
                                                    <asp:Label ID="lblModel" Text="Model" CssClass="control-label" runat="server"></asp:Label>
                                                    <asp:TextBox ID="txtModel" CssClass="form-control" runat="server"></asp:TextBox>
                                                </div>
                                            </div>  
                                            
                                            <div class="form-row">                                               
                                                <div class="col-md-12">
                                                    <asp:Label ID="lblSerial" Text="Serial" CssClass="control-label" runat="server"></asp:Label>
                                                    <asp:TextBox ID="txtSerial" CssClass="form-control" runat="server"></asp:TextBox>
                                                </div>
                                            </div> 

                                            <div class="form-row last">                                               
                                                <div class="col-md-12">
                                                    <asp:Label ID="lblArrangement" Text="Arrangement" CssClass="control-label" runat="server"></asp:Label>
                                                    <asp:TextBox ID="txtArrangement" CssClass="form-control" runat="server"></asp:TextBox>
                                                </div>
                                            </div> 

                                            <h5>Engine</h5>
                                            <div class="form-row">                                               
                                                <div class="col-md-12">
                                                    <asp:Label ID="lblModel1" Text="Model" CssClass="control-label" runat="server"></asp:Label>
                                                    <asp:TextBox ID="txtModel1" CssClass="form-control" runat="server"></asp:TextBox>
                                                </div>
                                            </div>  
                                            
                                            <div class="form-row">                                               
                                                <div class="col-md-12">
                                                    <asp:Label ID="lblSerial1" Text="Serial" CssClass="control-label" runat="server"></asp:Label>
                                                    <asp:TextBox ID="txtSerial1" CssClass="form-control" runat="server"></asp:TextBox>
                                                </div>
                                            </div> 

                                            <div class="form-row last">                                               
                                                <div class="col-md-12">
                                                    <asp:Label ID="lblArrangement1" Text="Arrangement" CssClass="control-label" runat="server"></asp:Label>
                                                    <asp:TextBox ID="txtArrangement1" CssClass="form-control" runat="server"></asp:TextBox>
                                                </div>
                                            </div> 
                                            
                                        </asp:Panel>
                                    </div>                                    
                                </div>                                
                            </div>                            
                        </div>
                        <div class="tab-pane" id="partinfo">
                            <div class="col-md-12">
                                <h3><asp:Label ID="lblSecondTabDesc" Text="" runat="server"></asp:Label></h3>
                                <div class="row">
                                    <div class="col-md-6">
                                        <asp:Panel ID="pnClaimsDept" GroupingText="Claims Department" runat="server">

                                            <div class="form-row">
                                                <div class="col-md-12">
                                                    <asp:Label ID="lblQuarantine" Text="Quarantine Required?" CssClass="control-label" runat="server"></asp:Label>
                                                    <asp:CheckBox ID="chkQuarantine" onclick="setQuarantine();" AutoPostBack="true" runat="server" />
                                                    <asp:LinkButton ID="lnkQuarantine" class="btn btn-primary btnSmallSize" runat="server">
                                                        <i class="fa fa-1x fa-gear download" aria-hidden="true"> </i> Update
                                                    </asp:LinkButton>
                                                    <div class="form-row">                                                       
                                                        <div class="col-md-6">
                                                            <asp:TextBox ID="txtQuarantine" CssClass="form-control" runat="server" />                                                            
                                                        </div>
                                                        <div class="col-md-6">
                                                            <asp:TextBox ID="txtQuarantineDate" CssClass="form-control" runat="server" />  
                                                        </div>
                                                    </div>                                                    
                                                </div>                                                
                                            </div>

                                            <div class="form-row">
                                                <div class="col-md-12">
                                                    <asp:Label ID="lblDiagnose" Text="Diagnose" CssClass="control-label" runat="server"></asp:Label>                                                    
                                                    <asp:LinkButton ID="lnkDiagnose" class="btn btn-primary btnSmallSize" runat="server">
                                                        <i class="fa fa-1x fa-gear download" aria-hidden="true"> </i> Update
                                                    </asp:LinkButton>
                                                    <div class="form-row">                                                        
                                                        <div class="col-md-6">
                                                            <asp:TextBox ID="txtDiagnoseData" CssClass="form-control" runat="server" />                                                            
                                                        </div>
                                                        <div class="col-md-6">
                                                            <asp:DropDownList ID="ddlDiagnoseData" AutoPostBack="true" OnSelectedIndexChanged="ddlDiagnoseData_SelectedIndexChanged" EnableViewState="true" ViewStateMode="Enabled" CssClass="form-control" runat="server" />
                                                        </div>
                                                    </div>                                                    
                                                </div>                                                
                                            </div>

                                            <div class="form-row">
                                                <div class="col-md-6">
                                                    <asp:Label ID="lblClaimReason" Text="Claim Reason" CssClass="control-label" runat="server"></asp:Label>
                                                    <asp:TextBox ID="txtClaimReason" CssClass="form-control" runat="server"></asp:TextBox>
                                                </div>
                                                <div class="col-md-6">
                                                    <asp:Label ID="lblProductionCode" Text="Production Code" CssClass="control-label" runat="server"></asp:Label>
                                                    <asp:TextBox ID="txtProductionCode" CssClass="form-control" runat="server"></asp:TextBox>
                                                </div>
                                            </div>

                                            <div class="form-row">
                                                <div class="col-md-6">
                                                    <asp:Label ID="lblVendorNo" Text="Vendor No." CssClass="control-label" runat="server"></asp:Label>
                                                    <div class="form-row">
                                                        <div class="col-md-9">
                                                            <asp:TextBox ID="txtVendorNo" CssClass="form-control" runat="server"></asp:TextBox>
                                                        </div>
                                                        <div class="col-md-3 pleft0">
                                                            <asp:Button ID="btnChangeVendor" CssClass="btn btn-primary btnpadding btnAdjustSize" OnClick="btnChangeVendor_Click"  Text="Change" runat="server" />
                                                        </div>
                                                    </div>                                                    
                                                </div>
                                                <div class="col-md-6">
                                                    <asp:Label ID="lblVendorName" Text="Vendor Name" CssClass="control-label" runat="server"></asp:Label>
                                                    <asp:TextBox ID="txtVendorName" CssClass="form-control" runat="server"></asp:TextBox>
                                                </div>
                                            </div>
                                            
                                            <div class="form-row">
                                                <div class="col-md-6">
                                                    <asp:Label ID="lblInvoiceNo1" Text="Supplier Invoice No." CssClass="control-label" runat="server"></asp:Label>
                                                    <asp:TextBox ID="txtInvoiceNo1" CssClass="form-control" runat="server"></asp:TextBox>
                                                </div>
                                                <div class="col-md-6">
                                                    <asp:Label ID="lblInvoiceDate1" Text="Supplier Invoice Date" CssClass="control-label" runat="server"></asp:Label>
                                                    <asp:TextBox ID="txtInvoiceDate1" CssClass="form-control" runat="server"></asp:TextBox>
                                                </div>
                                            </div>

                                            <div class="form-row last">
                                                <div class="col-md-6">
                                                    <asp:Label ID="lblBarSeq" Text="Bar Sequence" CssClass="control-label" runat="server"></asp:Label>
                                                    <asp:TextBox ID="txtBarSeq" CssClass="form-control" runat="server"></asp:TextBox>
                                                </div>
                                                <div class="col-md-6">
                                                    <asp:Label ID="lblReceiving" Text="Receiving" CssClass="control-label" runat="server"></asp:Label>
                                                    <asp:TextBox ID="txtReceiving" CssClass="form-control" runat="server"></asp:TextBox>
                                                </div>
                                            </div>

                                        </asp:Panel>

                                        <br />

                                        <asp:Panel ID="pnRestock" GroupingText="Re-Stock Actions" runat="server">

                                            <div class="form-row last">
                                                <div class="col-md-6">
                                                    <asp:Button ID="btnRestock" Text="Re-Stock Part" Enabled="False" OnClick="btnRestock_Click" CssClass="btn btn-primary" runat="server" />
                                                </div>
                                                <div class="col-md-6">
                                                    <asp:Button ID="btnUndoRestock" Text="Undo Re-Stock" OnClick="btnUndoRestock_Click" CssClass="btn btn-primary" runat="server" />
                                                </div>
                                            </div>

                                        </asp:Panel>

                                    </div>
                                    <div class="col-md-6"> 
                                        <div class="row">
                                            <asp:Panel ID="pnPartImage" GroupingText="Claim Images" runat="server">
                                                <div class="form-row last">
                                                    <div class="col-md-8">
                                                        <asp:DataList ID="datViewer" CssClass="inheritclass" RepeatColumns="3" CellPadding="5" EnableViewState="true" ViewStateMode="Enabled" runat="server">
                                                            <ItemTemplate>
                                                                <div id="wrapper">
                                                                    <a id="alink" href='<%# Container.DataItem %>' data-lightbox="roadtrip" rel="group" runat="server">
                                                                        <%-- class="zb" --%>
                                                                        <asp:Image ID="Img" CssClass="imgStyle" ImageUrl='<%# Container.DataItem %>' Width="60" Height="52" runat="server" />
                                                                    </a>
                                                                </div>
                                                            </ItemTemplate>
                                                        </asp:DataList>
                                                        <%--<asp:Image ID="imgPart" runat="server"/>--%>
                                                    </div>
                                                    <div class="col-md-4">
                                                        <asp:Label ID="lblPartDesc" CssClass="control-label" Text="Part Description" runat="server"></asp:Label>
                                                        <asp:TextBox ID="txtPartDesc" Text="" Enabled="false" TextMode="MultiLine" runat="server"></asp:TextBox>
                                                    </div>
                                                </div>
                                            </asp:Panel>                                                
                                        </div> 
                                        <br />
                                        <div class="row last">
                                            <asp:Panel ID="pnPartOEM" GroupingText="Part Images" runat="server">
                                                <div class="form-row last">
                                                    <div class="col-md-8">
                                                        <div class="form-row">
                                                            <div class="col-md-6">                                                               
                                                                <asp:DataList ID="DataListCTP" CssClass="inheritclass" RepeatColumns="1" CellPadding="5" EnableViewState="true" ViewStateMode="Enabled" runat="server">
                                                                    <HeaderTemplate>CTP PART IMAGE</HeaderTemplate>
                                                                    <HeaderStyle CssClass="datalist-header" />
                                                                    <ItemTemplate>
                                                                        <div id="wrapper">
                                                                            <a id="alinkCTP" href='<%# Container.DataItem %>' data-lightbox="roadtrip" rel="group" runat="server">
                                                                                <%-- class="zb" --%>
                                                                                <asp:Image ID="ImgCTP" CssClass="imgStyle" ImageUrl='<%# Container.DataItem %>' Width="150" Height="150" runat="server" />
                                                                            </a>
                                                                        </div>
                                                                    </ItemTemplate>
                                                                </asp:DataList>
                                                            </div>
                                                            <div class="col-md-6">                                                                
                                                                <asp:DataList ID="DataListOEM" CssClass="inheritclass" RepeatColumns="1" CellPadding="5" EnableViewState="true" ViewStateMode="Enabled" runat="server">
                                                                    <HeaderTemplate>OEM PART IMAGE</HeaderTemplate>
                                                                    <HeaderStyle CssClass="datalist-header" />
                                                                    <ItemTemplate>
                                                                        <div id="wrapper">
                                                                            <a id="alinkOEM" href='<%# Container.DataItem %>' data-lightbox="roadtrip" rel="group" runat="server">
                                                                                <%-- class="zb" --%>
                                                                                <asp:Image ID="ImgOEM" CssClass="imgStyle" ImageUrl='<%# Container.DataItem %>' Width="150" Height="150" runat="server" />
                                                                            </a>
                                                                        </div>
                                                                    </ItemTemplate>
                                                                </asp:DataList>
                                                            </div>
                                                        </div>

                                                        <%--<Atk:AjaxFileUpload ID="fnAjUpd" Mode="Auto" onuploadcomplete="fnAjUpd_UploadComplete"  Enabled="true" runat="server" />                                                 
                                                        <asp:Image ID="loader" runat="server" ImageUrl="~/Images/loading.gif" Style="display: None" />--%>
                                                    </div>
                                                    <div class="col-md-4">
                                                        <asp:Label ID="lblPartDesc1" CssClass="control-label" Text="Part Description" runat="server"></asp:Label>
                                                        <asp:TextBox ID="txtPartDesc1" Text="" Enabled="false" TextMode="MultiLine" runat="server"></asp:TextBox>
                                                    </div>
                                                </div>
                                            </asp:Panel>                                                
                                        </div>
                                    </div>
                                </div>                                
                            </div>                            
                        </div>
                        <div class="tab-pane" id="claimstatus">
                            <div class="col-md-12">
                                <h3><asp:Label ID="lblThirdTabDesc" Text="" runat="server"></asp:Label></h3>
                                <div class="row">
                                    <div class="col-md-3"></div>
                                    <div class="col-md-6 margin0">
                                        <asp:Panel ID="pnInternalStatus" GroupingText="Internal Status" runat="server">

                                            <div class="form-row">                                                
                                                <div class="col-md-12">
                                                    <asp:Label ID="lblActualStatus" Text="Actual Status" CssClass="control-label" runat="server"></asp:Label>
                                                    <asp:TextBox ID="txtActualStatus" CssClass="form-control" placeholder="Info requested to cust." runat="server"></asp:TextBox>
                                                </div>
                                            </div>  

                                            <div class="form-row">
                                                <div class="col-md-12">
                                                    <asp:Label ID="lblInitialReview" Text="Initial Review" CssClass="control-label" runat="server"></asp:Label>
                                                    <asp:CheckBox ID="chkInitialReview" runat="server" />
                                                    <asp:LinkButton ID="lnkInitialReview" class="btn btn-primary btnSmallSize" runat="server">
                                                        <i class="fa fa-1x fa-gear download" aria-hidden="true"> </i> Update
                                                    </asp:LinkButton>                                                    
                                                    <div class="form-row">                                                       
                                                        <div class="col-md-6">
                                                            <asp:TextBox ID="txtInitialReview" CssClass="form-control" runat="server" />                                                            
                                                        </div>
                                                        <div class="col-md-6">
                                                            <asp:TextBox ID="txtInitialReviewDate" CssClass="form-control" runat="server" />  
                                                        </div>
                                                    </div>                                                    
                                                </div>                                                
                                            </div>   
                                            
                                            <div class="form-row">
                                                <div class="col-md-12">
                                                    <asp:Label ID="lblAcknowledgeEmail" Text="Acknowledge Email" CssClass="control-label" runat="server"></asp:Label>
                                                    <asp:CheckBox ID="chkAcknowledgeEmail" OnCheckedChanged="chkAcknowledgeEmail_CheckedChanged" AutoPostBack="true" runat="server" />
                                                    <asp:LinkButton ID="lnkAcknowledgeEmail" class="btn btn-primary btnSmallSize" runat="server">
                                                        <i class="fa fa-1x fa-gear download" aria-hidden="true"> </i> Update
                                                    </asp:LinkButton>
                                                    <asp:Label ID="lblAckMessageStatus" CssClass="clsMesageSaved hideProp" Text="Message Saved!! Please click the update button." runat="server"></asp:Label>
                                                    <div class="form-row">                                                       
                                                        <div class="col-md-6">
                                                            <asp:TextBox ID="txtAcknowledgeEmail" CssClass="form-control" runat="server" />                                                            
                                                        </div>
                                                        <div class="col-md-6">
                                                            <asp:TextBox ID="txtAcknowledgeEmailDate" CssClass="form-control" runat="server" />  
                                                        </div>
                                                    </div>                                                    
                                                </div>                                                
                                            </div>

                                            <div id="rwAckEmailMsg" class="form-row paddingVert hideProp" runat="server">
                                                <div class="col-md-12">
                                                    <asp:TextBox ID="txtMsgAftAckEmail" Text="" CssClass="form-control fullTextBox hideProp" TextMode="MultiLine" runat="server"></asp:TextBox>
                                                    <asp:Label ID="lblTextEditorAck" CssClass="hideProp" runat="server"></asp:Label>
                                                </div>
                                            </div>

                                            <div class="form-row">
                                                <div class="col-md-12">
                                                    <asp:Label ID="lblInfoCust" Text="Info Requested to Customer" CssClass="control-label" runat="server"></asp:Label>
                                                    <asp:CheckBox ID="chkInfoCust" OnCheckedChanged="chkInfoCust_CheckedChanged" AutoPostBack="true" runat="server" />
                                                    <asp:LinkButton ID="lnkInfoCust" class="btn btn-primary btnSmallSize" runat="server">
                                                        <i class="fa fa-1x fa-gear download" aria-hidden="true"> </i> Update
                                                    </asp:LinkButton>
                                                    <asp:Label ID="lblInfoCMessageStatus" CssClass="clsMesageSaved hideProp" Text="Message Saved!! Please click the update button." runat="server"></asp:Label>
                                                    <div class="form-row">                                                       
                                                        <div class="col-md-6">
                                                            <asp:TextBox ID="txtInfoCust" CssClass="form-control" runat="server" />                                                            
                                                        </div>
                                                        <div class="col-md-6">
                                                            <asp:TextBox ID="txtInfoCustDate" CssClass="form-control" runat="server" />  
                                                        </div>
                                                    </div>                                                    
                                                </div>                                                
                                            </div>

                                            <div id="rwAckEmailMsg1" class="form-row paddingVert hideProp" runat="server">
                                                <div class="col-md-12">
                                                    <asp:TextBox ID="txtMsgAftAckEmail1" Text="" CssClass="form-control fullTextBox hideProp" TextMode="MultiLine" runat="server"></asp:TextBox>
                                                    <asp:Label ID="lblTextEditorInfoCust" CssClass="hideProp" runat="server"></asp:Label>
                                                </div>
                                            </div>

                                            <div class="form-row">
                                                <div class="col-md-12">
                                                    <asp:Label ID="lblPartRequested" Text="Part Requested" CssClass="control-label" runat="server"></asp:Label>
                                                    <asp:CheckBox ID="chkPartRequested" runat="server" />
                                                    <asp:LinkButton ID="lnkPartRequested" class="btn btn-primary btnSmallSize" runat="server">
                                                        <i class="fa fa-1x fa-gear download" aria-hidden="true"> </i> Update
                                                    </asp:LinkButton>
                                                    <div class="form-row">                                                       
                                                        <div class="col-md-6">
                                                            <asp:TextBox ID="txtPartRequested" CssClass="form-control" runat="server" />                                                            
                                                        </div>
                                                        <div class="col-md-6">
                                                            <asp:TextBox ID="txtPartRequestedDate" CssClass="form-control" runat="server" />  
                                                        </div>
                                                    </div>                                                    
                                                </div>                                                
                                            </div>

                                            <div class="form-row">
                                                <div class="col-md-12">
                                                    <asp:Label ID="lblPartReceived" Text="Part Received" CssClass="control-label" runat="server"></asp:Label>
                                                    <asp:CheckBox ID="chkPartReceived" runat="server" />
                                                    <asp:LinkButton ID="lnkPartReceived" class="btn btn-primary btnSmallSize" runat="server">
                                                        <i class="fa fa-1x fa-gear download" aria-hidden="true"> </i> Update
                                                    </asp:LinkButton>
                                                    <div class="form-row">                                                       
                                                        <div class="col-md-6">
                                                            <asp:TextBox ID="txtPartReceived" CssClass="form-control" runat="server" />                                                            
                                                        </div>
                                                        <div class="col-md-6">
                                                            <asp:TextBox ID="txtPartReceivedDate" CssClass="form-control" runat="server" />  
                                                        </div>
                                                    </div>                                                    
                                                </div>                                                
                                            </div>

                                            <div class="form-row">
                                                <div class="col-md-12">
                                                    <asp:Label ID="lblTechReview" Text="Technical Review" CssClass="control-label" runat="server"></asp:Label>
                                                    <asp:CheckBox ID="chkTechReview" runat="server" />
                                                    <asp:LinkButton ID="lnkTechReview" class="btn btn-primary btnSmallSize" runat="server">
                                                        <i class="fa fa-1x fa-gear download" aria-hidden="true"> </i> Update
                                                    </asp:LinkButton>
                                                    <div class="form-row">                                                       
                                                        <div class="col-md-6">
                                                            <asp:TextBox ID="txtTechReview" CssClass="form-control" runat="server" />                                                            
                                                        </div>
                                                        <div class="col-md-6">
                                                            <asp:TextBox ID="txtTechReviewDate" CssClass="form-control" runat="server" />  
                                                        </div>
                                                    </div>                                                    
                                                </div>                                                
                                            </div>

                                            <div class="form-row">
                                                <div class="col-md-12">
                                                    <asp:Label ID="lblWaitSupReview" Text="Waiting Supplier Review" CssClass="control-label" runat="server"></asp:Label>
                                                    <asp:CheckBox ID="chkWaitSupReview" runat="server" />
                                                    <asp:LinkButton ID="lnkWaitSupReview" class="btn btn-primary btnSmallSize" runat="server">
                                                        <i class="fa fa-1x fa-gear download" aria-hidden="true"> </i> Update
                                                    </asp:LinkButton>
                                                    <div class="form-row">                                                       
                                                        <div class="col-md-6">
                                                            <asp:TextBox ID="txtWaitSupReview" CssClass="form-control" runat="server" />                                                            
                                                        </div>
                                                        <div class="col-md-6">
                                                            <asp:TextBox ID="txtWaitSupReviewDate" CssClass="form-control" runat="server" />  
                                                        </div>
                                                    </div>                                                    
                                                </div>                                                
                                            </div>

                                            <div class="form-row last">
                                                <div class="col-md-12">
                                                    <asp:Label ID="lblClaimCompleted" Text="Claim Completed" CssClass="control-label" runat="server"></asp:Label>
                                                    <asp:CheckBox ID="chkClaimCompleted" CssClass="hideProp" runat="server" />
                                                    <asp:LinkButton ID="lnkClaimCompleted" class="btn btn-primary btnSmallSize hideProp" runat="server">
                                                        <i class="fa fa-1x fa-gear download" aria-hidden="true"> </i> Update
                                                    </asp:LinkButton>
                                                    <div class="form-row">                                                       
                                                        <div class="col-md-6">
                                                            <asp:TextBox ID="txtClaimCompleted" CssClass="form-control" runat="server" />                                                            
                                                        </div>
                                                        <div class="col-md-6">
                                                            <asp:TextBox ID="txtClaimCompletedDate" CssClass="form-control" runat="server" />  
                                                        </div>
                                                    </div>                                                    
                                                </div>                                                
                                            </div>

                                        </asp:Panel>
                                    </div>
                                    <div class="col-md-3">                                        
                                        <asp:Panel ID="pnExternalStatus10" GroupingText="External Status" CssClass="hidecol" runat="server">

                                            <div class="form-row"> 
                                                <div class="col-md-3"></div>
                                                <div class="col-md-6">
                                                    <asp:Label ID="lblClaimStatus" Text="Claim Status" CssClass="control-label" runat="server"></asp:Label>
                                                    <asp:TextBox ID="txtClaimStatus" CssClass="form-control" runat="server"></asp:TextBox>
                                                </div>
                                                <div class="col-md-3"></div>
                                            </div>

                                            <div class="form-row last"> 
                                                <div class="col-md-3"></div>
                                                <div class="col-md-6">
                                                    <asp:Label ID="lblTotalAmount" Text="Total Amount Approved" CssClass="control-label" runat="server"></asp:Label>
                                                    <asp:TextBox ID="txtTotalAmount" CssClass="form-control" runat="server"></asp:TextBox>
                                                </div>
                                                <div class="col-md-3"></div>
                                            </div>

                                        </asp:Panel>

                                        <br />
                                        
                                    </div>
                                </div> 
                                <br />                                
                            </div>                            
                        </div>
                        <div class="tab-pane" id="claim-comments">
                            <!-- Tab Description text -->
                            <div class="row">
                                <div class="col-md-12">
                                    <h3><asp:Label ID="lblFourTabDesc" Text="" runat="server"></asp:Label></h3>    
                                </div>
                            </div>

                            <!-- add and see claims buttons -->
                            <div class="row">
                                <div class="col-md-4">
                                </div>
                                <div class="col-md-4">
                                    <asp:Panel ID="pnSubActionComment" GroupingText="Comments" runat="server">
                                        <div class="form-row last">
                                            <div class="col-md-6">
                                                <asp:Button ID="btnAddComments" Text="Add Comments" OnClick="btnAddComments_Click" CssClass="btn btn-primary btnAdjustSize" runat="server" />
                                            </div>
                                            <div class="col-md-6">
                                                <asp:Button ID="btnSeeComments" Text="See Comments" OnClick="btnSeeComments_Click" CssClass="btn btn-primary btnAdjustSize" runat="server" />
                                            </div>
                                        </div>
                                    </asp:Panel>
                                </div>
                                <div class="col-md-4">
                                </div>
                            </div> 

                            <br />

                            <!-- panels to show -->
                            <!-- Add comments panels  -->
                            <div id="rowAddComments" runat="server">

                                <!-- row add comments section -->
                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="row">
                                            <div class="col-md-3">&nbsp;</div>
                                            <div class="col-md-6">
                                                <div id="addCommentsR" class="container hideProp" runat="server">

                                                    <!-- panel for claim comments -->
                                                    <asp:Panel ID="pnClaimComm" GroupingText="Add Claim Comments" runat="server">                                                    

                                                        <!-- row for retno and wrnno -->
                                                        <div class="form-row">
                                                            <div class="col-md-6">
                                                                <div class="form-group">
                                                                    <asp:Label ID="lblAddWrnNo" CssClass="label-style" Text="Warning No." runat="server"></asp:Label>
                                                                    <asp:TextBox ID="txtAddWrnNo" CssClass="form-control fullTextBox disableCtr" runat="server" />
                                                                </div>
                                                            </div>
                                                            <div class="col-md-6">
                                                                <div class="form-group">
                                                                    <asp:Label ID="lblAddRetNo" CssClass="label-style" Text="Return No." runat="server"></asp:Label>
                                                                    <asp:TextBox ID="txtAddRetNo" CssClass="form-control fullTextBox disableCtr" runat="server" />
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <!-- row for datefrom and dateto -->
                                                        <div id="rowAddCommInit" class="form-row hideProp">                                                            
                                                            <div class="col-md-6 padding0">
                                                                <label for="sel-vndassigned">From</label>
                                                                <div class="input-group-append">
                                                                    <asp:TextBox ID="txtAddCommDateInit" name="txt-dateinit" placeholder="MM/DD/AAAA" class="form-control autosuggestdateinit" runat="server"></asp:TextBox>
                                                                    <span class="input-group-addon"><i class="fa fa-calendar"></i></span>
                                                                </div>
                                                            </div>                                                            
                                                            <div class="col-md-6 padding0">
                                                                <label for="sel-vndassigned">To</label>
                                                                <div class="input-group-append">
                                                                    <asp:TextBox ID="txtAddCommDateTo" name="txt-dateto" placeholder="HH:MM:SS" class="form-control autosuggestdateto" runat="server"></asp:TextBox>
                                                                    <span class="input-group-addon"><i class="fa fa-clock-o"></i></span>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <!-- row for subject -->
                                                        <div class="form-row">
                                                            <div class="col-md-12">
                                                                <div class="form-group">
                                                                    <asp:Label ID="lblAddSubject" CssClass="label-style" Text="Subject ( Mandatory )" runat="server"></asp:Label>
                                                                    <asp:TextBox ID="txtAddSubject" CssClass="form-control fullTextBox" runat="server" />
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <!-- row for int and ext comm -->
                                                        <div class="form-row hideProp" style="border-bottom: 2px groove whitesmoke;">
                                                            <div class="col-md-6">
                                                                <div class="form-group">
                                                                    <asp:Label ID="lblAddIntComm" CssClass="label-style" Text="Internal Comment" runat="server"></asp:Label>
                                                                    <asp:RadioButton ID="rdAddIntComm" runat="server" />
                                                                </div>
                                                            </div>
                                                            <div class="col-md-6">
                                                                <div class="form-group">
                                                                    <asp:Label ID="lblAddExtComm" CssClass="label-style" Text="External Comment" runat="server"></asp:Label>
                                                                    <asp:RadioButton ID="rdAddExtComm" runat="server" />
                                                                </div>
                                                            </div>
                                                        </div>                                                        

                                                        <!-- row for add comment gridview -->
                                                        <div class="form-row last" style="padding-top: 10px !important;">
                                                            <div class="col-md-12"> 
                                                                <div class="form-group">                                                                    
                                                                    <asp:Label ID="lblMessage" CssClass="label-style" Text="Message ( Optional )" runat="server"></asp:Label>
                                                                    <asp:TextBox ID="txtMessage" TextMode="MultiLine" CssClass="form-control fullTextBox" runat="server"></asp:TextBox>  
                                                                    
                                                                    <div style="float:right;padding-top: 10px;padding-bottom: 10px;">
                                                                        <asp:Button ID="btnMessage" Text="Add New Comment" CssClass="btn btn-primary btnAdjustSize" OnClick="btnMessage_Click" runat="server" />
                                                                    </div>
                                                                    

                                                                    <%--<asp:GridView ID="grvAddComm" AutoGenerateColumns="false" GridLines="None" ShowFooter="true" 
                                                                        CssClass="table table-striped table-bordered" OnRowDataBound="grvAddComm_RowDataBound" 
                                                                        OnRowEditing="grvAddComm_OnRowEditing" OnRowCommand="grvAddComm_RowCommand" OnRowUpdating="grvAddComm_OnRowUpdating"
                                                                        runat="server" AutoGenerateEditButton="true" AutoGenerateDeleteButton ="true">
                                                                        <Columns> 
                                                                            <asp:TemplateField>
                                                                                <ItemTemplate>
                                                                                    <asp:TextBox ID="txtInnerComment" Text='<%# Eval("Comment") %>' runat="server"></asp:TextBox>
                                                                                </ItemTemplate>
                                                                            </asp:TemplateField>
                                                                            <%--<asp:BoundField DataField="Comment" HeaderText="COMMENTS" ItemStyle-Width="6%" />--%>
                                                                            <%-- <asp:TemplateField>                                                                                        
                                                                                <FooterStyle HorizontalAlign="Right" />
                                                                                <FooterTemplate>
                                                                                    <asp:linkButton ID="grvAddBtn" CommandName="AddNewRow" Text="Add New Row" runat="server"  />
                                                                                </FooterTemplate>
                                                                            </asp:TemplateField>
                                                                        </Columns>
                                                                        <HeaderStyle BackColor="#0063A6" ForeColor="White" />
                                                                    </asp:GridView>--%>
                                                                </div>                                                                
                                                            </div>
                                                        </div>

                                                        <div class="form-row hideProp">
                                                            <div class="col-md-12">
                                                                <div class="form-group">
                                                                    <asp:ListBox ID="lstComments" EnableViewState=" true" ViewStateMode="Enabled" runat="server"> </asp:ListBox> 
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <!-- row for comment action buttons -->
                                                        <div class="form-row last hideProp">
                                                            <div class="col-md-4"></div>
                                                            <div class="col-md-2">
                                                                <asp:Button ID="btnSaveComment" Text="Save" OnClick="btnSaveComment_click" CssClass="btn btn-primary btnAdjustSize" runat="server" />
                                                            </div>
                                                            <div class="col-md-2">
                                                                <asp:Button ID="btnExitComment" Text="Exit" CssClass="btn btn-primary btnAdjustSize" runat="server" />
                                                            </div>
                                                            <div class="col-md-4"></div>
                                                        </div>

                                                    </asp:Panel>

                                                </div>
                                            </div>
                                            <div class="col-md-3">&nbsp;</div>
                                        </div>                                        
                                    </div>                                    
                                </div>

                                <!-- row add vnd comments section -->
                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="row">
                                            <div class="col-md-3">&nbsp;</div>
                                            <div class="col-md-6">
                                                <div id="addVendorComments" class="container hideProp" runat="server">

                                                    <!-- panel for claim vnd comments -->
                                                    <asp:Panel ID="pnVndClaimComm" GroupingText="Add Vendor Claim Comments" runat="server">

                                                        <!-- row for claimNo -->
                                                        <div class="form-row">
                                                            <div class="col-md-6">
                                                                <div class="form-group">
                                                                    <asp:Label ID="lblAddClaimNo" CssClass="label-style" Text="Claim No." runat="server"></asp:Label>
                                                                    <asp:TextBox ID="txtAddClaimNo" CssClass="form-control fullTextBox" runat="server" />
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <!-- row for dates -->
                                                        <div id="rowAddVndCommInit" class="form-row">                                                            
                                                            <div class="col-md-6 padding0">
                                                                <label for="sel-vndassigned">From</label>
                                                                <div class="input-group-append">
                                                                    <asp:TextBox ID="txtAddVndCommDateInit" name="txt-dateinit" placeholder="MM/DD/AAAA" class="form-control autosuggestdateinit" runat="server"></asp:TextBox>
                                                                    <span class="input-group-addon"><i class="fa fa-calendar"></i></span>
                                                                </div>
                                                            </div>                                                            
                                                            <div class="col-md-6 padding0">
                                                                <label for="sel-vndassigned">To</label>
                                                                <div class="input-group-append">
                                                                    <asp:TextBox ID="txtAddVndCommDateTo" name="txt-dateto" placeholder="HH:MM:SS" class="form-control autosuggestdateto" runat="server"></asp:TextBox>
                                                                    <span class="input-group-addon"><i class="fa fa-clock"></i></span>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <!-- row for vnd subject -->
                                                        <div class="form-row" style="border-bottom: 2px groove whitesmoke;">
                                                            <div class="col-md-12">
                                                                <div class="form-group">
                                                                    <asp:Label ID="lblAddVndSubject" CssClass="label-style" Text="Subject" runat="server"></asp:Label>
                                                                    <asp:TextBox ID="txtAddVndSubject" CssClass="form-control fullTextBox" runat="server" />
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <!-- row for add comment gridview -->
                                                        <div class="form-row" style="padding-top: 10px;">
                                                            <div class="col-md-12">
                                                                <div class="form-group">
                                                                    <asp:Label ID="lblVndMessage" CssClass="label-style" Text="Message" runat="server"></asp:Label>
                                                                    <asp:TextBox ID="txtVndMessage" TextMode="MultiLine" CssClass="form-control fullTextBox" runat="server"></asp:TextBox>

                                                                    <div style="float: right; padding-top: 10px; padding-bottom: 10px;">
                                                                        <asp:Button ID="btnVndMessage" Text="Add New Comment" CssClass="btn btn-primary btnAdjustSize" OnClick="btnVndMessage_Click" runat="server" />
                                                                    </div>


                                                                    <%--<asp:GridView ID="grvAddComm" AutoGenerateColumns="false" GridLines="None" ShowFooter="true" 
                                                                        CssClass="table table-striped table-bordered" OnRowDataBound="grvAddComm_RowDataBound" 
                                                                        OnRowEditing="grvAddComm_OnRowEditing" OnRowCommand="grvAddComm_RowCommand" OnRowUpdating="grvAddComm_OnRowUpdating"
                                                                        runat="server" AutoGenerateEditButton="true" AutoGenerateDeleteButton ="true">
                                                                        <Columns> 
                                                                            <asp:TemplateField>
                                                                                <ItemTemplate>
                                                                                    <asp:TextBox ID="txtInnerComment" Text='<%# Eval("Comment") %>' runat="server"></asp:TextBox>
                                                                                </ItemTemplate>
                                                                            </asp:TemplateField>
                                                                            <%--<asp:BoundField DataField="Comment" HeaderText="COMMENTS" ItemStyle-Width="6%" />--%>
                                                                    <%-- <asp:TemplateField>                                                                                        
                                                                                <FooterStyle HorizontalAlign="Right" />
                                                                                <FooterTemplate>
                                                                                    <asp:linkButton ID="grvAddBtn" CommandName="AddNewRow" Text="Add New Row" runat="server"  />
                                                                                </FooterTemplate>
                                                                            </asp:TemplateField>
                                                                        </Columns>
                                                                        <HeaderStyle BackColor="#0063A6" ForeColor="White" />
                                                                    </asp:GridView>--%>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div class="form-row">
                                                            <div class="col-md-12">
                                                                <div class="form-group">
                                                                    <asp:ListBox ID="lstVndMessage" EnableViewState=" true" ViewStateMode="Enabled" runat="server"></asp:ListBox>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <!-- row for comment action buttons -->
                                                        <div class="form-row last">
                                                            <div class="col-md-4"></div>
                                                            <div class="col-md-2">
                                                                <asp:Button ID="btnVndSaveComment" Text="Save" OnClick="btnVndSaveComment_click" CssClass="btn btn-primary btnAdjustSize" runat="server" />
                                                            </div>
                                                            <div class="col-md-2">
                                                                <asp:Button ID="btnVndExitComment" Text="Exit" CssClass="btn btn-primary btnAdjustSize" runat="server" />
                                                            </div>
                                                            <div class="col-md-4"></div>
                                                        </div>

                                                    </asp:Panel>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>                                

                            </div>
                            <!-- See comments panels  -->
                            <div id="rowSeeComments" class="hideProp" runat="server">

                                <!-- row see comments section -->
                                <div class="row">
                                    <div id="seeCommentsR" class="container hideProp" runat="server">
                                        <!-- Warning No and Return No values -->
                                        <div class="form-row hideProp">
                                            <div class="col-md-6">
                                                <div class="form-group">
                                                    <asp:Label ID="lblWrnNo" CssClass="label-style" Text="Warning No." runat="server"></asp:Label>
                                                    <asp:TextBox ID="txtWrnNo" CssClass="form-control fullTextBox" runat="server" />
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="form-group">
                                                    <asp:Label ID="lblRetNo" CssClass="label-style" Text="Return No." runat="server"></asp:Label>
                                                    <asp:TextBox ID="txtRetNo" CssClass="form-control fullTextBox" runat="server" />
                                                </div>
                                            </div>
                                        </div>

                                        <!-- row gridview see comments -->
                                        <div class="row">
                                            <%--<div class="col-md-2"></div>--%>
                                            <div class="col-md-12">
                                                <div class="panel panel-default">
                                                    <div class="panel-body">
                                                        <div class="form-horizontal">
                                                            <div id="rowGridViewSeeComm">
                                                                <asp:GridView ID="grvSeeComm" AutoGenerateColumns="false" ShowFooter="false" PageSize="10"
                                                                    CssClass="table table-striped table-bordered" AllowPaging="True" GridLines="None" runat="server"
                                                                    OnPageIndexChanging="grvSeeComm_PageIndexChanging" OnRowDataBound="grvSeeComm_RowDataBound"
                                                                    OnRowCommand="grvSeeComm_RowCommand">
                                                                    <Columns>
                                                                        <asp:BoundField DataField="CWWRNO" HeaderText="ID" ItemStyle-Width="3%" ItemStyle-CssClass="hidecol" HeaderStyle-CssClass="hidecol" />
                                                                        <asp:BoundField DataField="CWCHCO" HeaderText="CODE" ItemStyle-Width="10%" ItemStyle-CssClass="hidecol" HeaderStyle-CssClass="hidecol"   />                                                                        
                                                                        <asp:TemplateField HeaderText="DATE ENTERED" HeaderStyle-Width="10%" ItemStyle-Width="10%" >
                                                                            <ItemTemplate>
                                                                                <asp:Literal ID="Literal100" runat="server"
                                                                                    Text='<%#String.Format("{0:MM/dd/yyyy}", System.Convert.ToDateTime(Eval("CWCHDA"))) %>'>        
                                                                                </asp:Literal>
                                                                            </ItemTemplate>
                                                                        </asp:TemplateField>
                                                                        <asp:TemplateField HeaderText="TIME ENTERED" HeaderStyle-Width="10%" ItemStyle-Width="10%" >
                                                                            <ItemTemplate>
                                                                                <asp:Literal ID="Literal10000" runat="server"
                                                                                    Text='<%#String.Format("{0:T}", System.Convert.ToDateTime(Eval("CWCHTI"))) %>'>        
                                                                                </asp:Literal>
                                                                            </ItemTemplate>
                                                                        </asp:TemplateField>
                                                                        <%--<asp:BoundField DataField="CWCHDA" HeaderText="DATE ENTERED" ItemStyle-Width="30%" />--%>
                                                                        <%--<asp:BoundField DataField="CWCHTI" HeaderText="TIME ENTERED" ItemStyle-Width="30%" />--%>
                                                                        <asp:BoundField DataField="USUSER" HeaderText="USER" ItemStyle-Width="10%" />
                                                                        <asp:BoundField DataField="CWCHSU" HeaderText="SUBJECT" ItemStyle-Width="20%"  />
                                                                        <asp:BoundField DataField="CWCDTX" HeaderText="COMMENT" ItemStyle-Width="50%"  />
                                                                        <asp:BoundField DataField="CWCFLA" HeaderText="Int / Ext " ItemStyle-Width="6%" ItemStyle-CssClass="hidecol" HeaderStyle-CssClass="hidecol"  />                                                                        
                                                                        <%--<asp:TemplateField HeaderText="DETAIL" ItemStyle-Width="10%">
                                                                            <ItemTemplate>
                                                                                <asp:LinkButton ID="lnkExpander1" runat="server" TabIndex="1" ToolTip="Get Comment Detail" CssClass="click-in2" CommandName="commentDet"
                                                                                    OnClientClick='<%# String.Format("return divexpandcollapse(this, {0});", Eval("CWCHCO")) %>'>
                                                                                    <span id="Span111" aria-hidden="true" runat="server">
                                                                                        <i class="fa fa-plus"></i>
                                                                                    </span>
                                                                                </asp:LinkButton>
                                                                                </td>
                                                                                <tr>
                                                                                    <td colspan="100%" class="padding0">
                                                                                        <div id="div<%# Eval("CWCHCO") %>" class="divCustomClass">
                                                                                            <asp:GridView ID="grvSeeCommDet" runat="server" CssClass="innerGrv" AutoGenerateColumns="false" GridLines="None">
                                                                                                <Columns>
                                                                                                    <asp:BoundField DataField="CWCHCO" HeaderText="ID" ItemStyle-Width="5%" ItemStyle-CssClass="hidecol" HeaderStyle-CssClass="hidecol" />
                                                                                                    <asp:BoundField DataField="CWCDTX" HeaderText="COMMENT" ItemStyle-Width="5%" ItemStyle-CssClass="centered" />
                                                                                                </Columns>
                                                                                                <HeaderStyle BackColor="#95B4CA" ForeColor="White" />
                                                                                            </asp:GridView>
                                                                                        </div>
                                                                                    </td>
                                                                                </tr>
                                                                            </ItemTemplate>
                                                                        </asp:TemplateField>--%>
                                                                    </Columns>
                                                                    <HeaderStyle BackColor="#0063A6" ForeColor="White" />
                                                                    <PagerSettings Mode="NumericFirstLast" FirstPageText="First" LastPageText="Last" PageButtonCount="10" />
                                                                    <PagerStyle CssClass="pagination-ys" HorizontalAlign="Center" />
                                                                </asp:GridView>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <%--<div class="col-md-2"></div>--%>
                                        </div>

                                         <!-- row actions btns see vnd comments -->
                                        <div class="form-row hideProp">
                                            <div class="form-group col-md-3"></div>
                                            <div class="form-group col-md-6" style="padding-top: 20px;">
                                                <div class="row">
                                                    <div class="col-md-6" style="float: right; text-align: right !important;">
                                                        <asp:Button ID="btnPrintSeeClaim" Text="Print" class="btn btn-primary btnAdjustSize" runat="server" />
                                                    </div>
                                                    <div class="col-md-6" style="float: left;">
                                                        <asp:Button ID="btnExitSeeClaim" Text="   Exit   " class="btn btn-primary btnAdjustSize" runat="server" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="form-group col-md-3"></div>
                                        </div>

                                    </div>
                                </div>

                                <!-- row see vnd comments section -->
                                <div class="row">
                                    <div id="seeVendorComments" class="container hideProp" runat="server">
                                        <!-- Cust No value -->
                                        <div class="form-row hideProp">
                                            <div class="col-md-6">
                                                <div class="form-group">
                                                    <asp:Label ID="lblSeeVndComm" CssClass="label-style" Text="Claim No." runat="server"></asp:Label>
                                                    <asp:TextBox ID="txtSeeVndComm" CssClass="form-control fullTextBox" runat="server" />
                                                </div>
                                            </div>
                                        </div>

                                        <!-- row gridview see vnd comments -->
                                        <div class="row">
                                            <div class="col-md-12">
                                                <div class="panel panel-default">
                                                    <div class="panel-body">
                                                        <div class="form-horizontal">
                                                            <div id="rowGridViewSeeVndComm">
                                                                <asp:GridView ID="grvSeeVndComm" AutoGenerateColumns="false" ShowFooter="false" PageSize="10"
                                                                    CssClass="table table-striped table-bordered" AllowPaging="True" GridLines="None" runat="server"
                                                                    OnPageIndexChanging="grvSeeVndComm_PageIndexChanging" OnRowDataBound="grvSeeVndComm_RowDataBound"
                                                                    OnRowCommand="grvSeeVndComm_RowCommand">
                                                                    <Columns>
                                                                        <asp:BoundField DataField="CCCLNO" HeaderText="ID" ItemStyle-Width="3%" ItemStyle-CssClass="hidecol" HeaderStyle-CssClass="hidecol" />
                                                                        <asp:BoundField DataField="CCCODE" HeaderText="CODE" ItemStyle-Width="10%" ItemStyle-CssClass="hidecol" HeaderStyle-CssClass="hidecol" />

                                                                        <asp:TemplateField HeaderText="DATE ENTERED" HeaderStyle-Width="10%" ItemStyle-Width="10%" >
                                                                            <ItemTemplate>
                                                                                <asp:Literal ID="Literal10000000" runat="server"
                                                                                    Text='<%#String.Format("{0:MM/dd/yyyy}", System.Convert.ToDateTime(Eval("CCDATE"))) %>'>        
                                                                                </asp:Literal>
                                                                            </ItemTemplate>
                                                                        </asp:TemplateField>
                                                                        <asp:TemplateField HeaderText="TIME ENTERED" HeaderStyle-Width="10%" ItemStyle-Width="10%" >
                                                                            <ItemTemplate>
                                                                                <asp:Literal ID="Literal100000" runat="server"
                                                                                    Text='<%#String.Format("{0:T}", System.Convert.ToDateTime(Eval("CCTIME"))) %>'>        
                                                                                </asp:Literal>
                                                                            </ItemTemplate>
                                                                        </asp:TemplateField>

                                                                        <%--<asp:BoundField DataField="CCDATE" HeaderText="DATE ENTERED" ItemStyle-Width="6%" />
                                                                        <asp:BoundField DataField="CCTIME" HeaderText="TIME ENTERED" ItemStyle-Width="6%" />--%>
                                                                        <asp:BoundField DataField="USUSER" HeaderText="USER" ItemStyle-Width="10%" />
                                                                        <asp:BoundField DataField="CCSUBJ" HeaderText="SUBJECT" ItemStyle-Width="10%" />                                                                        
                                                                        <asp:BoundField DataField="CCTEXT" HeaderText="COMMENT" ItemStyle-Width="60%" /> 
                                                                        <%--<asp:TemplateField HeaderText="DETAIL" ItemStyle-Width="13%">
                                                                            <ItemTemplate>
                                                                                <asp:LinkButton ID="lnkExpander" runat="server" TabIndex="1" ToolTip="Get Comment Detail" CssClass="click-in2" CommandName="commentDet"
                                                                                    OnClientClick='<%# String.Format("return divexpandcollapse(this, {0});", Eval("CCCODE")) %>'>
                                                                                    <span id="Span11" aria-hidden="true" runat="server">
                                                                                        <i class="fa fa-plus"></i>
                                                                                    </span>
                                                                                </asp:LinkButton>
                                                                                </td> 
                                                                                    <tr>
                                                                                        <td colspan="100%" class="padding0">
                                                                                            <div id="div<%# Eval("CCCODE") %>" class="divCustomClass">
                                                                                                <asp:GridView ID="grvSeeVndCommDet" runat="server" AutoGenerateColumns="false" GridLines="None">
                                                                                                    <Columns>
                                                                                                        <asp:BoundField DataField="CCCODE" HeaderText="ID" ItemStyle-Width="3%" ItemStyle-CssClass="hidecol" HeaderStyle-CssClass="hidecol" />
                                                                                                        <asp:BoundField DataField="CCTEXT" HeaderText="COMMENT" ItemStyle-Width="5%" />
                                                                                                    </Columns>
                                                                                                    <HeaderStyle BackColor="#95B4CA" ForeColor="White" />
                                                                                                </asp:GridView>
                                                                                            </div>
                                                                                        </td>
                                                                                    </tr>
                                                                            </ItemTemplate>
                                                                        </asp:TemplateField>--%>
                                                                    </Columns>
                                                                    <HeaderStyle BackColor="#0063A6" ForeColor="White" />
                                                                    <PagerSettings Mode="NumericFirstLast" FirstPageText="First" LastPageText="Last" PageButtonCount="10" />
                                                                    <PagerStyle CssClass="pagination-ys" HorizontalAlign="Center" />
                                                                </asp:GridView>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <!-- row actions btns see vnd comments -->
                                        <div class="form-row">
                                            <div class="form-group col-md-3"></div>
                                            <div class="form-group col-md-6" style="padding-top: 20px;">
                                                <div class="row">
                                                    <div class="col-md-6" style="float: right; text-align: right !important;">
                                                        <asp:Button ID="btnPrintSeeVndClaim" Text="Print" class="btn btn-primary btnAdjustSize" runat="server" />
                                                    </div>
                                                    <div class="col-md-6" style="float: left;">
                                                        <asp:Button ID="btnExitSeeVndClaim" Text="   Exit   " class="btn btn-primary btnAdjustSize" runat="server" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="form-group col-md-3"></div>
                                        </div>
                                    </div>
                                </div>

                            </div>

                        </div>
                        <div class="tab-pane" id="claimcredit">
                            <div class="col-md-12">
                                <h3><asp:Label ID="lblFiveTabDesc" Text="" runat="server"></asp:Label></h3> 
                                <div class="row">
                                    <div class="col-md-6 margin0">
                                        <asp:Panel ID="pnTotals" GroupingText="Totals" runat="server">

                                            <asp:Panel ID="pnSubTotalClaimed" GroupingText="claim value" runat="server">
                                                <div class="form-row last paddingtop8">
                                                    <div class="col-md-12">
                                                        <%--<asp:Label ID="lblSubClaim" Text="Subtotal Claimed" CssClass="control-label undermark" runat="server"></asp:Label>--%>
                                                        <div class="form-row paddingtop8">
                                                            <%--<div class="col-md-3"></div>--%>
                                                            <div class="col-md-3">
                                                                <asp:Label ID="lblParts" CssClass="control-label" Text="Unit Cost Value" runat="server" />
                                                            </div>
                                                            <div class="col-md-3">
                                                                <asp:TextBox ID="txtParts" CssClass="form-control" Enabled="false" runat="server" />
                                                            </div>
                                                            <%--<div class="col-md-3"></div>--%>
                                                            <div class="col-md-3">
                                                                <asp:Label ID="lblTotValue" CssClass="control-label" Text="Total Claim Value" runat="server" />
                                                            </div>
                                                            <div class="col-md-3">
                                                                <asp:TextBox ID="txtTotValue" Enabled="false" CssClass="form-control" runat="server" />
                                                            </div>


                                                            <div class="col-md-2 hideProp">
                                                                <asp:Label ID="lblFreight" CssClass="control-label" Text="Freight" runat="server" />
                                                            </div>
                                                            <div class="col-md-4 hideProp">
                                                                <asp:TextBox ID="txtFreight" CssClass="form-control" runat="server" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </asp:Panel>

                                            <br />

                                            <asp:Panel ID="pnConsequentalDamage" GroupingText="Consequential Damage" runat="server">
                                                <div class="form-row paddingtop8">
                                                    <div class="col-md-12">
                                                        <asp:Label ID="lblConsDamage" Text="Consequential damage, if any." CssClass="control-label" runat="server"></asp:Label>
                                                        <asp:CheckBox ID="chkConsDamage" OnCheckedChanged="chkConsDamage_CheckedChanged" AutoPostBack="true" runat="server" />
                                                        <asp:LinkButton ID="lnkConsDamage" class="btn btn-primary btnSmallSize" OnClick="lnkConsDamage_Click" runat="server">
			                                                <i class="fa fa-1x fa-gear download" aria-hidden="true"> </i> Update
                                                        </asp:LinkButton>
                                                        <%--<asp:TextBox ID="txtConsDamage" CssClass="form-control" runat="server"></asp:TextBox>--%>
                                                    </div>
                                                </div>
                                                <div class="form-row paddingtop8">
                                                    <div class="col-md-3">
                                                        <asp:Label ID="lblCDLabor" Text="Labor Cost" CssClass="control-label" runat="server"> </asp:Label>
                                                        <asp:TextBox ID="txtCDLabor" CssClass="form-control" Enabled="false" AutoPostBack="true" EnableViewState="true" ViewStateMode="Enabled" runat="server"></asp:TextBox>
                                                    </div>
                                                    <div class="col-md-3">
                                                        <asp:Label ID="lblCDPart" Text="Part Cost" CssClass="control-label" runat="server"></asp:Label>
                                                        <asp:TextBox ID="txtCDPart" CssClass="form-control" Enabled="false" AutoPostBack="true" EnableViewState="true" ViewStateMode="Enabled" runat="server"></asp:TextBox>
                                                    </div>
                                                    <div class="col-md-3">
                                                        <asp:Label ID="lblCDFreight" Text="Freight Cost" CssClass="control-label" runat="server"></asp:Label>
                                                        <asp:TextBox ID="txtCDFreight" CssClass="form-control" Enabled="false" AutoPostBack="true" EnableViewState="true" ViewStateMode="Enabled" runat="server"></asp:TextBox>
                                                    </div>
                                                    <div class="col-md-3">
                                                        <asp:Label ID="lblCDMisc" Text="Misc Cost" CssClass="control-label" runat="server"></asp:Label>
                                                        <asp:TextBox ID="txtCDMisc" CssClass="form-control" Enabled="false" AutoPostBack="true" EnableViewState="true" ViewStateMode="Enabled" runat="server"></asp:TextBox>
                                                    </div>
                                                </div>
                                                <div class="form-row paddingtop8">
                                                    <div class="col-md-12">
                                                        <asp:Label ID="Label3" Text="Total Cons. Damage Value" CssClass="control-label" runat="server"></asp:Label>
                                                        <asp:TextBox ID="txtConsDamageTotal" CssClass="form-control" Enabled="false" AutoPostBack="true" EnableViewState="true" ViewStateMode="Enabled" runat="server"></asp:TextBox>
                                                    </div>
                                                </div>
                                                <div class="form-row last">
                                                    <div class="col-md-6">
                                                    </div>
                                                    <div class="col-md-6">
                                                        <asp:Button ID="btnGetTotalCDValue" Text="Calculate Cons. Damage" CssClass="btn btn-primary btnAdjustSize float-right" OnClick="btnGetTotalCDValue_Click" runat="server" />
                                                    </div>
                                                </div>
                                            </asp:Panel>

                                            <br />

                                            <asp:Panel ID="pnPartialCredit" GroupingText="Partial Credit" CssClass="hideProp" runat="server">
                                                <div class="form-row paddingtop8">
                                                    <div class="col-md-12">
                                                        <asp:Label ID="lblPCred" Text="Credit To Apply" CssClass="control-label" runat="server"></asp:Label>
                                                        <asp:CheckBox ID="chkPCred" OnCheckedChanged="chkPCred_CheckedChanged" AutoPostBack="true" Enabled="true" runat="server" />
                                                        <asp:LinkButton ID="lnkPCred" class="btn btn-primary btnSmallSize" runat="server">
			                                                <i class="fa fa-1x fa-gear download" aria-hidden="true"> </i> Update
                                                        </asp:LinkButton>
                                                    </div>
                                                </div>
                                                <div class="form-row last paddingtop8">
                                                    <div class="col-md-12">
                                                        <div class="form-row">
                                                            <div class="col-md-2"></div>
                                                            <div class="col-md-4">
                                                                <asp:Label ID="lblPartCred" CssClass="control-label" Text="New Total Claim Value" runat="server" />
                                                            </div>
                                                            <div class="col-md-4">
                                                                <asp:TextBox ID="txtPartCred" Enabled="false" CssClass="form-control" runat="server" />
                                                            </div>
                                                            <div class="col-md-2"></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </asp:Panel>                                            

                                            <asp:Panel ID="pnSubTotalClaim" GroupingText="Claim" runat="server">
                                                <div class="form-row last">
                                                    <div class="col-md-12">
                                                        <%--<asp:Label ID="lblClaim" Text="Claim" CssClass="control-label undermark" runat="server"></asp:Label>--%>
                                                        <div class="form-row">
                                                            <div class="col-md-1">
                                                            </div>
                                                            <div class="col-md-2">
                                                                <asp:Label ID="lblApproved" CssClass="control-label" Text="Approved" runat="server" />
                                                            </div>
                                                            <div class="col-md-1">
                                                                <asp:CheckBox ID="chkApproved" AutoPostBack="true" CssClass="form-control"  OnCheckedChanged="chkApproved_CheckedChange" runat="server" />
                                                            </div>
                                                            <div class="col-md-2">
                                                                <asp:Label ID="lblDeclined" CssClass="control-label" Text="Declined" runat="server" />
                                                            </div>
                                                            <div class="col-md-1">
                                                                <asp:CheckBox ID="chkDeclined" AutoPostBack="true" runat="server" />
                                                            </div>
                                                            <div class="col-md-1">
                                                            </div>
                                                            <div class="col-md-2">
                                                                <asp:Label ID="lblCanClose" CssClass="control-label" Text="CM Done" runat="server" />
                                                                <asp:LinkButton ID="lnkCheckApprove" class="btn btn-primary btnSmallSize hideProp" runat="server">
			                                                        <i class="fa fa-1x fa-gear download" aria-hidden="true"> </i> Update
                                                                </asp:LinkButton>
                                                            </div>
                                                            <div class="col-md-1">
                                                                <asp:CheckBox ID="chkCanClose" CssClass="cg" Enabled="false" runat="server" />
                                                            </div>
                                                            <div class="col-md-1">
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </asp:Panel>
                                            <br />

                                        </asp:Panel>
                                    </div>
                                    <div class="col-md-6 margin0">
                                        <asp:Panel ID="pnSalesDept" GroupingText="Authorization Request" runat="server">

                                            <div class="form-row">
                                                <div class="col-md-12">
                                                    <asp:Label ID="lblClaimAuth" Text="Claim Authorization if over $500" CssClass="control-label" runat="server"></asp:Label>
                                                    <asp:CheckBox ID="chkClaimAuth" Enabled="false" runat="server" />
                                                    <asp:LinkButton ID="lnkClaimAuth" class="btn btn-primary btnSmallSize" runat="server">
                                                        <i class="fa fa-1x fa-gear download" aria-hidden="true"> </i> Update
                                                    </asp:LinkButton>
                                                    <div class="form-row last">
                                                        <div class="col-md-6">
                                                            <asp:TextBox ID="txtClaimAuth" Enabled="false" CssClass="form-control" runat="server" />
                                                        </div>
                                                        <div class="col-md-6">
                                                            <asp:TextBox ID="txtClaimAuthDate" Enabled="false" CssClass="form-control" runat="server" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="form-row hideProp">
                                                <div class="col-md-12">
                                                    <asp:Label ID="lblAmountApproved" Text="Claim amount approved by sales on top of Claims Approval" CssClass="control-label" runat="server"></asp:Label>
                                                    <asp:TextBox ID="txtAmountApproved" Enabled="false" CssClass="form-control" runat="server"></asp:TextBox>
                                                </div>
                                            </div>

                                        </asp:Panel>
                                    </div>
                                </div>
                            </div>
                            <!-- Tab Description text -->  
                           <%-- <div class="col-md-3"></div>--%>                            
                           <%-- <div class="col-md-3"></div>--%>
                            
                        </div>                        
                                
                    </div>                            
                </div>

                <div class="row" style="padding:5px 0 !important;"></div>

                <!-- Actions for Files Management -->
                <div id="rowPnActions" class="row" runat="server">
                    <div class="col-md-12">
                        <asp:Panel ID="pnActions" GroupingText="Actions" runat="server">
                            <div class="row">
                                <div class="col-md-2 hideProp">
                                    <%--<asp:Panel ID="pnSubActionComment" GroupingText="Comments" runat="server">
                                                        <div class="form-row last">
                                                            <div class="col-md-6">
                                                                <asp:Button ID="btnAddComment" Text="Add Comments" CssClass="btn btn-primary btnAdjustSize" runat="server" />
                                                            </div>
                                                            <div class="col-md-6">
                                                                <asp:Button ID="btnSeeComments" Text="See Comments" OnClick="btnSeeComments_Click" CssClass="btn btn-primary btnAdjustSize" runat="server" />
                                                            </div>
                                                        </div>
                                                    </asp:Panel>--%>
                                </div>
                                <div class="col-md-3">
                                    <asp:Panel ID="pnSubActionFiles" GroupingText="Files" runat="server">
                                        <div class="form-row last">
                                            <div class="col-md-1">&nbsp;</div>
                                            <div class="col-md-5">
                                                <asp:LinkButton id="btnAddFiles" class="boxed-btn-layout btn-sm btn-rounded" ToolTip="Add Files" runat="server">
                                                    <i class="fa fa-folder-plus fa-1x"" aria-hidden="true"> </i>  <p>Add Files</p>
                                                </asp:LinkButton>
                                                <%--<asp:Button ID="btnAddFiles" Text="Add Files" CssClass="btn btn-primary btnAdjustSize" runat="server" />--%>
                                            </div>
                                            <div class="col-md-5">
                                                <asp:LinkButton ID="btnSeeFiles" class="boxed-btn-layout btn-sm btn-rounded" OnClick="btnSeeFiles_Click" ToolTip="See Files" runat="server">
                                                    <i class="fa fa-folder-open fa-1x"" aria-hidden="true"> </i>  <p>See Files</p>
                                                </asp:LinkButton>
                                                <%--<asp:Button ID="btnSeeFiles" Text="See Files" OnClick="btnSeeFiles_Click" CssClass="btn btn-primary btnAdjustSize" runat="server" />--%>
                                            </div>
                                            <div class="col-md-1">&nbsp;</div>
                                        </div>
                                    </asp:Panel>
                                </div>                                
                                <div class="col-md-3">
                                    <asp:Panel ID="pnSendToCommentsTab" GroupingText="Comments" runat="server">
                                        <div class="form-row last">
                                            <div class="col-md-3">
                                                <asp:Button ID="btnSentToComm" Text="Go to Comments" CssClass="btn btn-primary btnAdjustSize hideProp" runat="server" />
                                            </div>
                                            <div class="col-md-6">
                                                <asp:LinkButton ID="lnkSentToComm" class="boxed-btn-layout btn-sm btn-rounded" OnClick="btnSentToComm_Click" ToolTip="Go to Comments" runat="server">
                                                    <i class="fa fa-comment-dots fa-1x"" aria-hidden="true"> </i>  <p>Go to Comments</p>
                                                </asp:LinkButton>
                                                <asp:Button ID="Button3" Text="Go to Comments" CssClass="btn btn-primary btnAdjustSize hideProp" runat="server" />
                                            </div>
                                            <div class="col-md-3"></div>
                                        </div>
                                    </asp:Panel>
                                </div>
                                <div class="col-md-3">
                                    <asp:Panel ID="pnSubActionFinal" GroupingText="Final Actions" runat="server">
                                        <div class="form-row last">
                                            <div class="col-md-1">&nbsp;</div>
                                            <div class="col-md-1 padding2 hideProp">
                                                <%--<asp:LinkButton ID="btnNew" class="boxed-btn-layout btn-sm btn-rounded" ToolTip="New" runat="server">
                                                    <i class="fa fa-file fa-2x"" aria-hidden="true"> </i> 
                                                </asp:LinkButton>--%>
                                                <%--<asp:Button ID="btnNew" CssClass="btn btn-primary btnFullSize" Text="New" runat="server" />--%>
                                            </div>
                                            <div class="col-md-5">
                                                <asp:LinkButton ID="btnSaveTab" class="boxed-btn-layout btn-sm btn-rounded" OnClick="btnSaveTab_Click" ToolTip="Save Changes" runat="server">
                                                    <i class="fa fa-save fa-1x"" aria-hidden="true"> </i>  <p>Save Changes</p>
                                                </asp:LinkButton>
                                                <%--<asp:Button ID="btnSaveTab" CssClass="btn btn-primary btnFullSize" Text="Save" OnClick="btnSaveTab_Click" runat="server" />--%>
                                            </div>
                                            <div class="col-md-5">
                                                <asp:LinkButton ID="btnCloseTab" class="boxed-btn-layout btn-sm btn-rounded" OnClick="btnCloseTab_Click" ToolTip="Back to Main" runat="server">
                                                    <i class="fa fa-sign-out-alt fa-1x"" aria-hidden="true"> </i>  <p>Back to Main</p>
                                                </asp:LinkButton>
                                                <%--<asp:Button ID="btnCloseTab" CssClass="btn btn-primary btnFullSize" Text="Close" OnClick="btnCloseTab_Click" runat="server" />--%>
                                            </div>
                                            <div class="col-md-1">&nbsp;</div>
                                        </div>
                                    </asp:Panel>
                                </div>
                                <div id="rwCloseClaim" class="col-md-3 hideProp" runat="server">
                                    <asp:Panel ID="pnCloseClaim" GroupingText="Close Action" runat="server">
                                        <div class="form-row last">
                                            <div class="col-md-1">
                                                <asp:Button ID="btnPurchasing" Text="Send to Purchasing" CssClass="btn btn-primary btnAdjustSize hideProp" runat="server" />
                                            </div>
                                            <div class="col-md-5">
                                                <asp:LinkButton ID="btnCloseClaim" class="boxed-btn-layout btn-sm btn-rounded" OnClick="btnCloseClaim_Click" ToolTip="Close Claim" runat="server">
                                                    <i class="fa fa-thumbs-up fa-1x"" aria-hidden="true"> </i>  <p>Close Claim</p>
                                                </asp:LinkButton>
                                                <asp:LinkButton ID="btnReopenClaim" class="boxed-btn-layout btn-sm btn-rounded hideProp" OnClick="btnReopen_Click" ToolTip="Re Open Claim" runat="server">
                                                    <i class="fa fa-edit fa-1x"" aria-hidden="true"> </i>  <p>Re Open Claim</p>
                                                </asp:LinkButton>
                                                <asp:LinkButton ID="btnReverseReject" class="boxed-btn-layout btn-sm btn-rounded hideProp" OnClick="btnReverseReject_Click" ToolTip="Reverse Rej." runat="server">
                                                    <i class="fa fa-history fa-1x"" aria-hidden="true"> </i>  <p>Reverse Rej.</p>
                                                </asp:LinkButton>
                                            </div>
                                            <div class="col-md-5">
                                                <asp:LinkButton ID="btnVoidClaim" class="boxed-btn-layout btn-sm btn-rounded" OnClick="btnVoid_Click" ToolTip="Void Claim" runat="server">
                                                    <i class="fa fa-eraser fa-1x"" aria-hidden="true"> </i>  <p>Void Claim</p>
                                                </asp:LinkButton>
                                            </div>
                                            <div class="col-md-1"></div>
                                        </div>
                                    </asp:Panel>
                                </div>
                            </div>
                        </asp:Panel>
                    </div>
                </div>

                <!-- General Btns for section -->
                <div id="rowBtn" class="row" runat="server">
                                  
                    

                </div>
             
            </div>

            <asp:Label runat="server" ID="dummylabel1"></asp:Label>
            <div id="seeFilesSection" class="container hideProp" runat="server">                               

                <div id="filesPanel" runat="server">
                    <div id="pnDiv" class="row" runat="server">
                        <asp:Panel ID="pnFilesPanel" CssClass="pnFilterStyles1" runat="server">
                        </asp:Panel>
                    </div>

                    <div class="row" style="background-color: #F7F7FD;padding: 15px 0;">
                        <div class="col-md-1"></div>
                        <div class="col-md-10">
                            <div class="row">
                                <div class="col-md-6" style="float: right; text-align: right !important;">
                                    <asp:Button ID="Button2" Text="Upload" class="btn btn-primary btn-lg btnFullSize" Visible="false" runat="server" />
                                </div>
                                <div class="col-md-6" style="float: left;">
                                    <asp:Button ID="BtnBackSeeFiles" Text="   Close   " class="btn btn-primary btn-md btnMidSize" OnClick="BtnBackSeeFiles_click" OnClientClick="setVisSeeFile(); return false" runat="server" />
                                </div>
                            </div>
                        </div>
                        <div class="col-md-1"></div>
                    </div> 
                    
                    <div class="row hideProp">
                        <asp:LinkButton ID="btnSeeFileMsg" OnClick="btnSeeFileMsg_Click" runat="server"></asp:LinkButton>
                    </div>
                </div>
            </div>

            <asp:Label runat="server" ID="dummylabel2"></asp:Label>
            <div id="acknowledgeEmailSection" class="container hideProp" runat="server">                               

                <div id="ackEmailP" runat="server">
                    <div id="pn1Div" class="row" runat="server">
                        <asp:Panel ID="pnAckEmail" CssClass="pnFilterStyles1" runat="server">
                            <div id="rwContainerChanged" class="container padding0">
                                <div class="row">                                    
                                    <div class="col-md-12 padding0">
                                        <div id="ackCommentHead" runat="server"><p>Insert the comment here!!</p></div>                                        
                                    </div>                                    
                                </div>
                                <div class="row">
                                    <div class="col-md-12 padding0">
                                        <asp:TextBox runat="server" ID="txtEditorExtender1" TextMode="MultiLine" Width="300" Height="200" placeholder="type your comment here!" />
                                        <Atk:HtmlEditorExtender ID="htmlEditorExtender1" TargetControlID="txtEditorExtender1" EnableSanitization="false" DisplaySourceTab ="false" runat="server"></Atk:HtmlEditorExtender>
                                    </div>
                                </div>
                            </div>                           

                        </asp:Panel>
                    </div>

                    <div id="rwBottomBar" class="row" style="background-color: #F7F7FD;padding: 15px 0 5px 0;text-align: right;border: 2px groove whitesmoke;">
                        <div class="col-md-1 padding0"></div>
                        <div class="col-md-10 padding0">
                            <div class="form-row padding0">
                                <div class="col-md-6 padding0" style="text-align: center !important;">
                                    <asp:Button ID="btnSaveMessageAck" Text="   Save   " class="btn btn-primary btn-md btnMidSize" OnClick="btnSaveMessageAck_click"  runat="server" />
                                </div>
                                <div class="col-md-6 padding0" style="text-align: center !important;">
                                    <asp:Button ID="BtnBackSeeFiles1" Text="   Close   " class="btn btn-primary btn-md btnMidSize" OnClick="BtnBackSeeFiles1_click" OnClientClick="setVisAckPop(); return false" runat="server" />
                                </div>
                            </div>
                        </div>
                        <div class="col-md-1 padding0"></div>
                    </div> 
                    
                    <div class="row hideProp">
                        <asp:LinkButton ID="btnSeeFileMsg1" OnClick="btnSeeFileMsg_Click" runat="server"></asp:LinkButton>
                    </div>
                </div>
            </div>

            <asp:Label runat="server" ID="dummylabel3"></asp:Label>
            <div id="infoCustSection" class="container hideProp" runat="server"> 
                <div id="infoCustP" runat="server">
                    <div id="pn2Div" class="row" runat="server">
                        <asp:Panel ID="pnInfoCust" CssClass="pnFilterStyles1" runat="server">
                            <div id="rwContainerChanged1" class="container padding0">
                                <div class="row">                                    
                                    <div class="col-md-12 padding0">
                                        <div id="infoCustHead" runat="server"><p>Insert the comment here!!</p></div>                                        
                                    </div>                                    
                                </div>
                                <div class="row">
                                    <div class="col-md-12 padding0">
                                        <asp:TextBox runat="server" ID="txtEditorExtender2" TextMode="MultiLine" Width="300" Height="200" placeholder="type your comment here!" />
                                        <Atk:HtmlEditorExtender ID="htmlEditorExtender2" TargetControlID="txtEditorExtender2" EnableSanitization="false" DisplaySourceTab ="false" runat="server"></Atk:HtmlEditorExtender>
                                    </div>
                                </div>
                            </div>                           

                        </asp:Panel>
                    </div>

                    <div id="rwBottomBar1" class="row" style="background-color: #F7F7FD;padding: 15px 0 5px 0;text-align: right;border: 2px groove whitesmoke;">
                        <div class="col-md-1 padding0"></div>
                        <div class="col-md-10 padding0">
                            <div class="form-row padding0">
                                <div class="col-md-6 padding0" style="text-align: center !important;">
                                    <asp:Button ID="btnSaveMessageInfoC" Text="   Save   " class="btn btn-primary btn-md btnMidSize" OnClick="btnSaveMessageInfoC_click"  runat="server" />
                                </div>
                                <div class="col-md-6 padding0" style="text-align: center !important;">
                                    <asp:Button ID="BtnBackSeeFiles2" Text="   Close   " class="btn btn-primary btn-md btnMidSize" OnClick="BtnBackSeeFiles2_click" OnClientClick="setVisInfoCust(); return false" runat="server" />
                                </div>
                            </div>
                        </div>
                        <div class="col-md-1 padding0"></div>
                    </div> 
                    
                    <div class="row hideProp">
                        <asp:LinkButton ID="LinkButton1" OnClick="btnSeeFileMsg_Click" runat="server"></asp:LinkButton>
                    </div>
                </div>
            </div>

            <asp:Label runat="server" ID="dummylabel4"></asp:Label>
            <div id="pnRestockSection" class="container hideProp" runat="server">     
                <div id="rstkPanel" runat="server">
                    
                    <div class="row">
                        <div class="col-md-12">
                            <asp:Panel ID="pnRestockPanel" GroupingText="Re-Stock Process" CssClass="pnFilterStyles1" style="width:70% !important;" runat="server">
                                <div id="pn4Div" class="row" style="padding: 10px 0;" runat="server">
                                    <div class="col-md-6 pt-3" style="border-right: 2px dotted #fbba42;">
                                        <div class="row">
                                            <div class="col-md-12 text-center">
                                                <h3 style="color:#fbba42;text-shadow: 1px 1px #404040;">Quantities</h3>
                                            </div>
                                        </div>
                                        <div class="row pt-3">
                                            <div class="col-md-12">
                                                <asp:Panel ID="pnRstkQty" runat="server">
                                                    <div class="row">
                                                        <div class="col-md-6">
                                                            <asp:Label ID="lblAvRstk" Text="Available" CssClass="control-label" runat="server"></asp:Label>
                                                            <asp:TextBox ID="txtAvRstk" CssClass="form-control" Enabled="false" runat="server"></asp:TextBox>
                                                        </div>
                                                        <div class="col-md-6">
                                                            <asp:Label ID="lblClRstk" Text="In Claim" CssClass="control-label" runat="server"></asp:Label>
                                                            <asp:TextBox ID="txtClRstk" CssClass="form-control" Enabled="false" runat="server"></asp:TextBox>
                                                        </div>
                                                    </div>
                                                </asp:Panel>
                                            </div>
                                        </div>
                                        <div class="row pt-3">                                            
                                            <div class="col-md-12 text-center">
                                                <asp:Label ID="lblRstk" Text="Qty to Restock" CssClass="control-label" runat="server"></asp:Label>
                                                <asp:TextBox ID="txtRstk" CssClass="form-control custom-rstk-css-input" runat="server"></asp:TextBox>
                                            </div>                                            
                                        </div>
                                    </div>
                                    <div class="col-md-6 pt-3">
                                        <div class="row">
                                            <div class="col-md-12 text-center">
                                                <h3 style="color:#fbba42;text-shadow: 1px 1px #404040;">Locations</h3>
                                            </div>
                                        </div>
                                        <div class="row pt-3">                                            
                                            <div class="col-md-12 text-center">
                                                <asp:Label ID="lblCurLoc" Text="Current" CssClass="control-label" runat="server"></asp:Label>
                                                <asp:TextBox ID="txtCurLoc" CssClass="form-control custom-rstk-css-input"  Enabled="false" runat="server"></asp:TextBox>
                                            </div>                                            
                                        </div>
                                        <div class="row pt-3">                                            
                                            <div class="col-md-12 text-center">
                                                <asp:Label ID="lblLocRstk" Text="To Restock" CssClass="control-label" runat="server"></asp:Label>
                                                <asp:DropDownList ID="ddlLocRstk" OnSelectedIndexChanged="ddlLocRstk_SelectedIndexChanged" AutoPostBack="false" CssClass="form-control custom-rstk-css-input" EnableViewState="true" ViewStateMode="Enabled" runat="server"></asp:DropDownList>
                                            </div>                                            
                                        </div>
                                    </div>
                                </div>

                                <div class="row" style="padding: 15px 0;text-align:center !important;">
                                    <div style="width: 98%;border-top: 1px solid #fbba42;margin-left: 1%;padding: 15px 0 5px 0;">                                        
                                        <div class="col-md-12">
                                            <div class="row">
                                                <div class="col-md-6" style="text-align:right !important;">
                                                    <asp:Button ID="BtnSaveRestock" Text="   Save   " class="btn btn-primary btn-md btnMidSize" OnClick="BtnSaveRestock_click" runat="server" />
                                                </div>
                                                <div class="col-md-6" style="text-align:left !important;">
                                                    <asp:Button ID="BtnBackRestock" Text="   Close   " class="btn btn-primary btn-md btnMidSize" OnClick="BtnBackRestock_click" runat="server" />
                                                </div>
                                            </div>
                                        </div>
                                        
                                    </div>
                                </div>
                            </asp:Panel>
                        </div>
                    </div>                    
                    
                    <div class="row hideProp">
                        <asp:LinkButton ID="LinkButton2" OnClick="btnSeeFileMsg_Click" runat="server"></asp:LinkButton>
                    </div>
                </div>
            </div>            

            <%--<asp:Label runat="server" ID="dummylabel"></asp:Label>
            <asp:Panel ID="panLogin" runat="server" HorizontalAlign="Left" Width="100%" Height="100%" CssClass="modalBackground" Style="display: none;">
                <asp:Panel ID="panInnerLogin" runat="server">
                    <div id="AddFilesSection" class="container hideProp" runat="server">
                        <div class="row">                            
                            <div id="pnAddClaimFile" class="modalPanel" runat="server">pnPartImage
                                <div class="row" style="padding: 30px 0;">
                                    <div class="col-md-1"></div>
                                    <div class="col-md-10"><span id="spnAddClaimFile">Select the file to atach to the open claim</span></div>
                                    <div class="col-md-1"></div>
                                </div>
                                <div class="row">
                                    <div class="col-md-2"></div>
                                    <div class="col-md-8 center-row">
                                        <asp:FileUpload ID="fuAddClaimFile" CssClass="form-control" runat="server" />
                                    </div>
                                    <div class="col-md-2"></div>
                                </div>
                                <div class="row" style="padding: 5px 0;">
                                    <div class="col-md-2"></div>
                                    <div class="col-md-8"><span id="spnTypeFormatClaimFile">(CSV and XLS formats are allowed)</span></div>
                                    <div class="col-md-2"></div>
                                </div>
                                <div class="row" style="padding: 20px 0;">
                                    <div class="col-md-1"></div>
                                    <div class="col-md-10">
                                        <div class="row">
                                            <div class="col-md-6" style="float: right; text-align: right !important;">
                                                <asp:Button ID="btnSaveFile" Text="Upload" class="btn btn-primary btn-lg btnFullSize" OnClick="btnSaveFile_Click" runat="server" />
                                            </div>
                                            <div class="col-md-6" style="float: left;">
                                                <asp:Button ID="btnBackFile" Text="   Back   " class="btn btn-primary btn-lg btnFullSize" runat="server" />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-1"></div>
                                </div>                    
                            </div>
                        </div>                        
                    </div> 
                </asp:Panel>
            </asp:Panel>--%>

            <%--<Atk:ModalPopupExtender ID="popUpLogin" runat="server" TargetControlID="dummylabel" BehaviorID="popupCopyCtrl"
                PopupControlID="panLogin" CancelControlID="btnBackFile">
            </Atk:ModalPopupExtender>--%>


            <asp:Label runat="server" ID="dummylabel"></asp:Label>
            <asp:Panel ID="panLogin" runat="server" HorizontalAlign="Left" Width="100%" Height="100%" CssClass="modalBackground" Style="display: none;">
                <asp:Panel ID="panInnerLogin" runat="server">
                    <div id="AddFilesSection" class="container hideProp" runat="server">
                        <div class="row">
                            <div id="pnAddClaimFile" class="modalPanel" runat="server">   
                                <div class="row" style="padding: 30px 0;">
                                    <div class="col-md-1"></div>
                                    <div class="col-md-10 hideProp"><span id="spnAddClaimFile">Drag the file(s) to attach to the open claim.</span></div>
                                    <div class="col-md-1"></div>
                                </div>

                                <div id="ajInputRow" class="row" style="padding: 30px 0;">
                                    
                                    <div class="col-md-12 center-row">
                                        <asp:FileUpload ID="fuAddClaimFile" CssClass="form-control hideProp" runat="server" />
                                        <Atk:AjaxFileUpload ID="fnAjUpd" Mode="Auto" onuploadcomplete="fnAjUpd_UploadComplete" OnUploadCompleteAll="fnAjUpd_UploadCompleteAll" Enabled="true" runat="server" />                                                 
                                        <asp:Image ID="loader" runat="server" ImageUrl="~/Images/loading.gif" Style="display: None" />
                                    </div>
                                    
                                </div>

                                <div class="row" style="padding: 70px 0 0 0;">
                                    <div class="col-md-2"></div>
                                    <div class="col-md-8 hideProp"><span id="spnTypeFormatClaimFile">(CSV and XLS formats are allowed)</span></div>
                                    <div class="col-md-2"></div>
                                </div>

                                <div class="row">
                                    <div class="col-md-1"></div>
                                    <div class="col-md-10">
                                        <div class="row">
                                            <div class="col-md-6" style="float: right; text-align: right !important;">
                                                <asp:Button ID="btnSaveFile" Text="Upload" class="btn btn-primary btn-lg btnFullSize" Visible="false" runat="server" />
                                            </div>
                                            <div class="col-md-6" style="float: left;">
                                                <asp:Button ID="btnBackFile" Text="   Close   " class="btn btn-primary btn-md btnFullSize" OnClick="btnBackFile_click" runat="server" />                                                
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-1"></div>
                                </div> 
                            </div>                            
                        </div>                        
                    </div> 
                </asp:Panel>
            </asp:Panel>

            <Atk:ModalPopupExtender ID="popAjUpLog" runat="server" TargetControlID="dummylabel" BehaviorID="popupCopyCtrl"
                PopupControlID="panLogin" CancelControlID="btnBackFile">
            </Atk:ModalPopupExtender>

            <Atk:ModalPopupExtender ID="popSeeFiles" runat="server" TargetControlID="dummylabel1" BehaviorID="popupCopyCtrl"
                PopupControlID="filesPanel" CancelControlID="BtnBackSeeFiles"  >
            </Atk:ModalPopupExtender>

            <Atk:ModalPopupExtender ID="popAckEmail" runat="server" TargetControlID="dummylabel2" BehaviorID="popupCopyCtrl"
                PopupControlID="ackEmailP" CancelControlID="BtnBackSeeFiles1"  >
            </Atk:ModalPopupExtender>

            <Atk:ModalPopupExtender ID="popInfoCust" runat="server" TargetControlID="dummylabel3" BehaviorID="popupCopyCtrl"
                PopupControlID="infoCustP" CancelControlID="BtnBackSeeFiles2"  >
            </Atk:ModalPopupExtender>

            <Atk:ModalPopupExtender ID="popRestock" runat="server" TargetControlID="dummylabel4" BehaviorID="popupCopyCtrl"
                PopupControlID="rstkPanel" CancelControlID="BtnBackRestock"  >
            </Atk:ModalPopupExtender>

            <br />
        </ContentTemplate>

    </asp:UpdatePanel>

    <div>
        <asp:Panel ID="panelUpdateProgress" runat="server" CssClass="updateProgress">
            <asp:UpdateProgress ID="UpdateProgress1" class="no-inline" runat="server" DisplayAfter="1">
                <ProgressTemplate>
                    <div class="no-inline" style="position: relative; text-align: center; background-color: #eeeeee; top: 0px;left: 0px; height:40px;">
                            <img src="Images/wait1.gif" style="vertical-align: middle" alt="Procesando" />Processing...</div>
                </ProgressTemplate>
            </asp:UpdateProgress>
        </asp:Panel>
        <Atk:ModalPopupExtender ID="ventanaModal" runat="server" TargetControlID="panelUpdateProgress"  PopupControlID="panelUpdateProgress" Enabled ="True"></Atk:ModalPopupExtender>
    </div>

    <div>
        <asp:Button ID ="btnCancelReq" CssClass="hideProp" runat="server" />
    </div>

    <%--<div>
        <asp:Panel ID="panelUpdateProgress1" runat="server" CssClass="updateProgress">
            <asp:UpdateProgress ID="UpdateProgress2" runat="server" DisplayAfter="1">
                <ProgressTemplate>
                    <div style="position: relative; text-align: center; background-color: #eeeeee; top: 0px;left: 0px; height:40px;">
                            <img src="Images/wait1.gif" style="vertical-align: middle" alt="Procesando" />Processing...</div>
                </ProgressTemplate>
            </asp:UpdateProgress>
        </asp:Panel>
        <Atk:ModalPopupExtender ID="ventanaModal1" runat="server" TargetControlID="panelUpdateProgress1"  PopupControlID="panelUpdateProgress1" OkControlID="updatepnl" OnOkScript="pepe1();" Enabled ="True"></Atk:ModalPopupExtender>
    </div>--%>

    <%--<script type="text/javascript" src="/Scripts/lightbox/prototype.js"></script>
    <script type="text/javascript" src="/Scripts/lightbox/lightbox.js"></script>--%>
    
    <%--<script type="text/javascript" src="/Scripts/lightbox/scriptaculous.js?load=builder"></script> --%>   
    <%--<script type="text/javascript" src="/Scripts/lightbox/effects.js"></script>
    <script type="text/javascript" src="/Scripts/lightbox/builder.js"></script>--%>
    
    <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>  
    <link href="https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.1/themes/base/jquery-ui.css" rel="stylesheet" type="text/css" />    
    <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.9.1/jquery-ui.min.js"></script>

    <script>
        //var $ = jQuery.noConflict();
    </script>  

    <script type="text/javascript">  

        var ventanaModal = '<%= ventanaModal.ClientID %>'; 

        //const myTT = setTimeout(testStop, 5000);
        var myTT = 10;

        function setUpdPnVisibility(flag) {

            if (flag == true) {
                $('#MainContent_panelUpdateProgress').removeClass('updateProgress');
                $('#MainContent_panelUpdateProgress').addClass('updateProgress hideProp');

                $('#MainContent_ventanaModal_backgroundElement').removeClass('no-inline');
                $('#MainContent_ventanaModal_backgroundElement').addClass('hideProp');
            }
            else {
                $('#MainContent_panelUpdateProgress').removeClass('updateProgress hideProp');
                $('#MainContent_panelUpdateProgress').addClass('updateProgress');

                $('#MainContent_ventanaModal_backgroundElement').removeClass('hideProp');               
            }            
        }

        function test22() {
            debugger 

            var updateProgress = $find("<%= UpdateProgress1.ClientID %>");            
            pepe1();
            const myTT = setTimeout(testStop, 10000);
            const myTT1 = setTimeout(JSFunction, 10000);
            //testStop()
        }

        function testStop() {
        /*const myTT = setTimeout(testStop, 5000);*/

            setUpdPnVisibility(true);

            clearTimeout(myTT);
            //JSFunction(); 
        }

        //Sys.WebForms.PageRequestManager.getInstance().add_endRequest(function () {
        //    alert('postback returned');
        //});

        var updateProgress = null;
        function pepe() {
            debugger

            myTT = setTimeout(testStop, 7000);
            <%--updateProgress = $find("<%= UpdateProgress1.ClientID %>");
            window.setTimeout("updateProgress.set_visible(true)", updateProgress.get_displayAfter());
            return true;--%>
                        
        }

        //$.ajax({

        //    beforeSend: function () {
        //        alert("before");
        //    },

        //    complete: function () {
        //        alert("complete");
        //    }

        //});        

        var updateProgress2 = null;
        function pepe1() {
            debugger

            updateProgress = $find("<%= UpdateProgress1.ClientID %>");
            window.setTimeout(function () {
                updateProgress.set_visible(true);
            }, updateProgress.get_displayAfter());

            $('<%=panelUpdateProgress.ClientID%>').removeClass('updateProgress');
            $('<%=panelUpdateProgress.ClientID%>').addClass('updateProgress inline-cls');

            $('<%=ventanaModal.ClientID%>').removeClass('no-inline');
            $('<%=ventanaModal.ClientID%>').addClass('inline-cls');
            
            return true;
        }

        function prm_EndRequest() {
            //debugger

            <%--updateProgress = $find("<%= UpdateProgress1.ClientID %>");
            window.setTimeout(function () {
                updateProgress.set_visible(false);
            }, updateProgress.get_displayAfter());
            return true;--%>

            // get the divImage and hide it again
            ////var panelProg1 = document.getElementById('<%=panelUpdateProgress.ClientID%>').value
            ////var modal1 = document.getElementById('<%=ventanaModal.ClientID%>').value
            //var panelProg = $get('panelUpdateProgress');
            ////$('#<%=panelUpdateProgress.ClientID %>').addClass('updateProgress hideProp');
            ////$('#<%=ventanaModal.ClientID %>').hide();
            //addClass('popp hideProp');

            //panelProg.style.display = 'none';

            // Enable button that caused a postback
            //$get(sender._postBackSettings.sourceElement.id).disabled = false;
        }

        //from above   

        function pepepe() {
            debugger

            $('#<%=hdConfirmationOption.ClientID %>').val('0');
            //alert("okokok");
        }        

        $('#myModal .modal-footer > button').on('click', function (e) {
            debugger

            var button = $(event.target);

            var ppe = "a";
        });

        function debugBase64(base64URL) {
            //debugger

            var win = window.open();
            win.document.write('<iframe src="' + base64URL + '" frameborder="0" style="border:0; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%;" allowfullscreen></iframe>');
        }
      
        function OpenBrowser(pp) {
            //debugger
            //var html = '<html><head></head><body>ohai</body></html>';
            var uri = "data:text/html," + encodeURIComponent(pp);
            //var newWindow = window.open(uri);

            debugBase64(uri);

            //window.open("https://www.w3schools.com");

        }

        function messageFormSubmitted(mensaje, show) {
            //debugger
            messages.alert(mensaje, { type: show });
            //setTimeout(function () {
            //    $("#myModal").hide();
            //}, 3000);
        }

        function messageFormSubmitted1(mensaje, show) {
            //debugger
            messages.confirm(mensaje, { type: show });
            //messages.prompt(mensaje, { type: show });
            //setTimeout(function () {
            //    $("#myModal").hide();
            //}, 3000);
        }

        function afterDdlCheck(hdFieldId, divId) {
            //debugger

            if (hdFieldId == 1) {
                divId.className = "collapse show"
            } else {
                divId.className = "collapse"
            }
        }

        function AcknowledgeEmailBuild() {
            //debugger
           
            var hdHasText = document.getElementById('<%=hdTextEditorAckMessage.ClientID%>').value;            

            if (hdHasText == "") {
                $('#MainContent_lblAckMessageStatus').addClass('hideProp')
            }
            else {
                $('#MainContent_lblAckMessageStatus').removeClass('clsMesageSaved hideProp');
                $('#MainContent_lblAckMessageStatus').addClass('clsMesageSaved');
            }            
        }

        function InfoCustomerBuild() {
            //debugger

            var hdHasText = document.getElementById('<%=hdTextEditorInfoCustMessage.ClientID%>').value;

            if (hdHasText == "") {
                $('#MainContent_lblInfoCMessageStatus').addClass('hideProp')
            }
            else {
                $('#MainContent_lblInfoCMessageStatus').removeClass('clsMesageSaved hideProp');
                $('#MainContent_lblInfoCMessageStatus').addClass('clsMesageSaved');
            }
        }

        function AcknowledgeEmailBuild1() {
            //debugger

            var hdAck = document.getElementById('<%=hdShowAckMsgForm.ClientID%>').value;
            var hdHasText = document.getElementById('<%=txtAcknowledgeEmail.ClientID%>').value;  
            //if (hdHasText != "")

            if (hdHasText == "") {
                $('#MainContent_rwAckEmailMsg').closest('.form-row').removeClass('hideProp')
            }
            else {
                $('#MainContent_rwAckEmailMsg').removeClass('form-row paddingVert');
                $('#MainContent_rwAckEmailMsg').addClass('form-row paddingVert hideProp');       
            }

            if (hdAck == "0" && hdHasText != "") {
                $('#<%=lnkAcknowledgeEmail.ClientID %>').removeClass('aspNetDisabled');
                $('#<%=lnkAcknowledgeEmail.ClientID %>').addClass('btn btn-primary btnSmallSize');

                $('#<%=chkAcknowledgeEmail.ClientID %>').addClass('disableCtr');
                $('#<%=chkAcknowledgeEmail.ClientID %>').attr('disabled', true);

                $('#<%=txtAcknowledgeEmail.ClientID %>').attr("disabled", "disabled");
                $('#<%=txtAcknowledgeEmailDate.ClientID %>').attr("disabled", "disabled");

                $('#<%=hdShowAckMsgForm.ClientID %>').val('0');
            }
        }

        <%--$('body').on('click', '#MainContent_lnkAcknowledgeEmail', function () {

            //debugger

            $('#<%=chkAcknowledgeEmail.ClientID %>').addClass('disableCtr');
            $('#<%=chkAcknowledgeEmail.ClientID %>').attr('disabled', true); 

            $('#<%=lnkAcknowledgeEmail.ClientID %>').removeClass('aspNetDisabled');
            $('#<%=lnkAcknowledgeEmail.ClientID %>').addClass('btn btn-primary btnSmallSize');  //disableCtr

            $('#<%=txtAcknowledgeEmail.ClientID %>').attr("disabled", "disabled");
            $('#<%=txtAcknowledgeEmailDate.ClientID %>').attr("disabled", "disabled");

            $('#<%=hdShowAckMsgForm.ClientID %>').val('0');

            //$('#<%=rwAckEmailMsg.ClientID %>').removeClass('form-row paddingVert');
            //$('#<%=rwAckEmailMsg.ClientID %>').addClass('form-row paddingVert hideProp');        

            //alert('pepe');
        });--%>
                
        $('body').on('click', '#accordion_2 h5 a', function () {
            //debugger
            //alert("pepe");
            var collapse1 = document.getElementById('collapseOne_2');
            isActivePanel(collapse1, 2);
        });

        $('body').on('click', '#accordion h5 a', function () {
            //debugger
            //alert("pepi");
            var collapse2 = document.getElementById('collapseOne');
            isActivePanel(collapse2, 1);
        });

        function isActivePanel(activePanel, valorActive) {
            //debugger

            var hd1 = document.getElementById('<%=hiddenId1.ClientID%>').value;
            var hd2 = document.getElementById('<%=hiddenId2.ClientID%>').value;

            if (valorActive == 1) {
                if ($('#<%=hiddenId1.ClientID %>').val() == "0") {
                    $('#<%=hiddenId1.ClientID %>').val("1");
                    hd1 = document.getElementById('<%=hiddenId1.ClientID%>').value;
                    //afterDdlCheck(hd1, activePanel)
                } else {
                    $('#<%=hiddenId1.ClientID %>').val("0");
                    hd1 = document.getElementById('<%=hiddenId1.ClientID%>').value;
                    //afterDdlCheck(hd1, activePanel)
                }
            }
            if (valorActive == 2) {
                if ($('#<%=hiddenId2.ClientID %>').val() == "0") {
                    $('#<%=hiddenId2.ClientID %>').val("1");
                    hd2 = document.getElementById('<%=hiddenId2.ClientID%>').value;
                    //afterDdlCheck(hd2, activePanel)
                }
                else {
                    $('#<%=hiddenId2.ClientID %>').val("0");
                    hd2 = document.getElementById('<%=hiddenId2.ClientID%>').value;
                    //afterDdlCheck(hd2, activePanel)
                }
            }

            JSFunction();
        }

        function JSFunction() {
            debugger

            __doPostBack('<%= updatepnl.ClientID  %>', '');
        }

        function disableInputs() {

            //debugger

            //$("#upPanel :input").attr("disabled", true);
            //$("#upPanel :input").prop("disabled", true);

            $("#pnClaimDetails :input").attr("disabled", true);
            $("#pnClaimDetails :input").prop("disabled", true);
        }

        function ToggleGridPanel(btn, row) {
            //debugger

            alert(value);
        }

        function DefaulSeeComm() {
            //debugger

            var hdSeeCommDef = document.getElementById('<%=hdGetCommentTab.ClientID%>').value;
            if (hdSeeCommDef == "1") {
                $('#MainContent_rowSeeComments').removeClass('hideProp');
            }
            else {
                $('#MainContent_rowSeeComments').addClass('hideProp');
            }
        }

        $('body').on('click', '.nav > li > a', function (e) {
            //debugger

            var data = $(this).attr("href");
            $('#<%=hdCurrentActiveTab.ClientID%>').val(data);

            //automatically open the past comments for current claim
            var hd1 = document.getElementById('<%=hdGetCommentTab.ClientID%>').value;

            if (data == "#claim-comments") {
                DefaulSeeComm()                
            }            

            if (data == "#claimcredit") {
                DefaulSeeComm()
                $('#<%=hdShowCloseBtn.ClientID%>').val("1");
                $('#MainContent_rwCloseClaim').removeClass('hideProp');
            }
            else {
                $('#<%=hdShowCloseBtn.ClientID%>').val("0");
                $('#MainContent_rwCloseClaim').removeClass('col-md-3');
                $('#MainContent_rwCloseClaim').addClass('col-md-3 hideProp');
            }

            expandMultilineTxt();  //tab click

            JSFunction();
        });

        $('body').on('click', '#MainContent_grvClaimReport th > a', function (e) {
            //debugger

            $(this).closest('th').addClass('header-Asc');

            var q = $(this);
            var colName = q.text();
            $('#<%=hdSelectedHeaderCell.ClientID %>').val(colName);          

        });       

        $('body').on('click', '.click-in', function (e) {

            var hd1 = document.getElementById('<%=hdLinkExpand.ClientID%>').value;
            //$('#MainContent_addNewPartManual2').closest('.container').removeClass('hideProp')
            var idd = e.currentTarget.id
            //document.getElementById('<%=hiddenId2.ClientID%>').value;
            //$('#' + idd).

            var val = $(this).attr('CLAIM#');
            var val1 = $(this).closest('.hideProp').removeClass('hideProp');
            //var id = $('MainContent_grvClaimReport_lnkExpander').data('CLAIM#');
            console.log(val1);
            //console.log(id);            
            console.log(e);

        });

        $('body').on('click', '.click-in1', function (e) {

            //debugger
            var hdGridView = document.getElementById('<%=hdGridViewContent.ClientID%>').value;
            var hdTabView = document.getElementById('<%=hdNavTabsContent.ClientID%>').value;

            if (hdGridView == "1") {
                $('#<%=hdGridViewContent.ClientID %>').val("0");
                $('#<%=hdNavTabsContent.ClientID %>').val("1");
                $('#<%=hdSeeFilesContent.ClientID %>').val("0");
                $('#<%=hdAckPopContent.ClientID %>').val("0");
                $('#<%=hdInfoCustContent.ClientID %>').val("0");
                $('#<%=hdRestockFlag.ClientID %>').val("0");
            } else {
                $('#<%=hdGridViewContent.ClientID %>').val("1");
                $('#<%=hdNavTabsContent.ClientID %>').val("0");
                $('#<%=hdSeeFilesContent.ClientID %>').val("0");
                $('#<%=hdAckPopContent.ClientID %>').val("0");
                $('#<%=hdInfoCustContent.ClientID %>').val("0");
                $('#<%=hdRestockFlag.ClientID %>').val("0");

            }

            //var hd1 = document.getElementById('<%=hdLinkExpand.ClientID%>').value;
            //$('#MainContent_addNewPartManual2').closest('.container').removeClass('hideProp')
            //var idd = e.currentTarget.id
            //document.getElementById('<%=hiddenId2.ClientID%>').value;
            //$('#' + idd).

            var hdGridView = document.getElementById('<%=hdGridViewContent.ClientID%>').value;
            if (hdGridView = "0") {

                $('#MainContent_gridviewRow').addClass('hideProp')
                $('#MainContent_navsSection').removeClass('hideProp')

            }
            else {

                $('#MainContent_gridviewRow').removeClass('hideProp')
                $('#MainContent_navsSection').addClass('hideProp')

            }

            $('#<%=hdAddClaimFile.ClientID %>').val("0");

            <%--var iGridViewClass = document.getElementById('<%=hdSelectedClass.ClientID%>').value;
            iAccess.toggleClass('divCustomClass divCustomClassOk');--%>           

        });

        function divexpandcollapse(divname) {
            //debugger

            var div = document.getElementById(divname);
            var img = document.getElementById('img' + divname);
            if (div.style.display == "none") {
                div.style.display = "inline";
                img.src = "../Images/minus.gif";
            } else {
                div.style.display = "none";
                img.src = "../Images/plus.gif";
            }
        }

        function divexpandcollapseChild(divname) {
            var div1 = document.getElementById(divname);
            var img = document.getElementById('img' + divname);
            if (div1.style.display == "none") {
                div1.style.display = "inline";
                img.src = "../Images/minus.gif";
            } else {
                div1.style.display = "none";
                img.src = "../Images/plus.gif";;
            }
        }

        function divexpandcollapse(controlid, divname) {
            //debugger
            if (divname == null) {
            } else {
                var iAccess = $("#div" + divname);
                var iContainer = $("#" + controlid.id)
                var temp2

                if (iContainer.find("i").length) {
                    temp2 = iContainer.attr('class');

                    for (var i = 0; i < iContainer.children.length; i++) {
                        if (iContainer.children(i).prop('tagName') == 'SPAN') {
                            var myControl = iContainer.children(i);
                            var iValue = myControl.children(0);
                            var iClass = iValue.attr('class');

                            var val1 = $('#<%=hdLinkExpand.ClientID %>').val();

                            if (iClass == "fa fa-plus" && $('#<%=hdLinkExpand.ClientID %>').val() == "0") {
                                $('#<%=hdLinkExpand.ClientID %>').val("1");
                            } else if (iClass == "fa fa-minus" && $('#<%=hdLinkExpand.ClientID %>').val() == "0") {
                                $('#<%=hdLinkExpand.ClientID %>').val("1");
                            }
                        }
                    }

                    $('#<%=hdTriggeredControl.ClientID %>').val(divname);
                    $('#<%=hdLaunchControl.ClientID %>').val(controlid.id);
                    $('#<%=hdSelectedClass.ClientID %>').val(iClass);
                }
            }
        }

        function divexpandcollapse1(controlid, divname) {
            //debugger            
            if (divname == null) {
            } else {
                var iAccess = $("#div" + divname);
                var iContainer = $("#" + controlid.id)
                var temp2

                if (iContainer.find("i").length) {
                    temp2 = iContainer.attr('class');

                    for (var i = 0; i < iContainer.children.length; i++) {
                        if (iContainer.children(i).prop('tagName') == 'SPAN') {
                            var myControl = iContainer.children(i);
                            var iValue = myControl.children(0);
                            var iClass = iValue.attr('class');

                            var val1 = $('#<%=hdLinkExpand.ClientID %>').val();

                            if (iClass == "fa fa-plus" && $('#<%=hdLinkExpand.ClientID %>').val() == "0") {
                                $('#<%=hdLinkExpand.ClientID %>').val("1");
                            } else if (iClass == "fa fa-minus" && $('#<%=hdLinkExpand.ClientID %>').val() == "0") {
                                $('#<%=hdLinkExpand.ClientID %>').val("1");
                            }
                        }
                    }

                    $('#<%=hdTriggeredControl.ClientID %>').val(divname);
                    $('#<%=hdLaunchControl.ClientID %>').val(controlid.id);
                    $('#<%=hdSelectedClass.ClientID %>').val(iClass);
                }
            }
        }

        //end from above

        //General Methods Begin

        function SetReopenBtn() {
            //debugger

            var hdReopenFlag = document.getElementById('<%=hdIsReopen.ClientID%>').value;
            var hdLastComment = document.getElementById('<%=hdLastCommentValue.ClientID%>').value;
            var hdForceClosBtn = document.getElementById('<%=hdForceCloseBtn.ClientID%>').value;

            if (hdForceClosBtn == "1") {

                $('#MainContent_btnReopenClaim').addClass('hideProp');
                $('#MainContent_btnCloseClaim').removeClass('hideProp');
                $('#MainContent_btnCloseClaim').removeClass('disableCtr');

            }
            else {

                if (hdReopenFlag == "1") {
                    $('#MainContent_btnCloseClaim').addClass('hideProp');
                    $('#MainContent_btnReverseReject').addClass('hideProp');
                    $('#MainContent_btnReopenClaim').removeClass('hideProp');
                    $('#MainContent_btnReopenClaim').removeClass('disableCtr');

                }
                else if (hdReopenFlag == "0") {
                    $('#MainContent_btnReopenClaim').addClass('hideProp');
                    $('#MainContent_btnReverseReject').addClass('hideProp');
                    $('#MainContent_btnCloseClaim').removeClass('hideProp');
                    $('#MainContent_btnCloseClaim').removeClass('disableCtr');

                    $('#MainContent_pnSubActionComment').find('input').attr('disabled', false);
                    $('#MainContent_btnAddFiles').removeClass('disableCtr');
                    //$('#MainContent_btnSaveTab').removeClass('disableCtr');
                }
                else {
                    $('#MainContent_btnReopenClaim').addClass('hideProp');
                    $('#MainContent_btnCloseClaim').addClass('hideProp');
                    $('#MainContent_btnReverseReject').addClass('hideProp');                    
                }

            }
        }

        function contentVisual() {
            //debugger

            var hdGridVisualization = document.getElementById('<%=hdGridViewContent.ClientID%>').value
            if (hdGridVisualization == "1") {
                $('#MainContent_gridviewRow').closest('.container-fluid').removeClass('hideProp')
                $('#MainContent_rowFilters').closest('.container-fluid').removeClass('hideProp')
                $('#MainContent_navsSection').closest('.container').addClass('hideProp')
            }
            else {
                $('#MainContent_gridviewRow').closest('.container-fluid').addClass('hideProp')
                $('#MainContent_rowFilters').closest('.container-fluid').addClass('hideProp')
                $("#MainContent_navsSection").removeAttr("style");
            }

            var hdTabsVisualization = document.getElementById('<%=hdNavTabsContent.ClientID%>').value
            if (hdTabsVisualization == "1") {
                $('#MainContent_navsSection').closest('.container').removeClass('hideProp')
                $("#MainContent_navsSection").removeAttr("style");
                $('#MainContent_gridviewRow').closest('.container-fluid').addClass('hideProp')
                $('#MainContent_rowFilters').closest('.container-fluid').addClass('hideProp')
            }
            else {
                $('#MainContent_navsSection').closest('.container').addClass('hideProp')
                $('#MainContent_gridviewRow').closest('.container-fluid').removeClass('hideProp')
                $('#MainContent_rowFilters').closest('.container-fluid').removeClass('hideProp')
            }

            var hdSeeFilesVisualization = document.getElementById('<%=hdSeeFilesContent.ClientID%>').value
            if (hdSeeFilesVisualization == "1") {
                $('#MainContent_seeFilesSection').closest('.container').removeClass('hideProp')
                $('#MainContent_seeFilesSection').removeAttr("style");

                $('#MainContent_gridviewRow').closest('.container-fluid').addClass('hideProp')
                $('#MainContent_rowFilters').closest('.container-fluid').addClass('hideProp')
                $('#MainContent_navsSection').closest('.container').removeClass('hideProp')
            }
            else {

                if (hdTabsVisualization == "1") {
                    $('#MainContent_navsSection').closest('.container').removeClass('hideProp')
                    $("#MainContent_navsSection").removeAttr("style");
                    $('#MainContent_gridviewRow').closest('.container-fluid').addClass('hideProp')
                    $('#MainContent_rowFilters').closest('.container-fluid').addClass('hideProp')
                }
                else {
                    $('#MainContent_gridviewRow').closest('.container-fluid').removeClass('hideProp')
                    $('#MainContent_rowFilters').closest('.container-fluid').removeClass('hideProp')
                    $('#MainContent_navsSection').closest('.container').addClass('hideProp')
                }                
            }

            var hdAckPopVisualization = document.getElementById('<%=hdAckPopContent.ClientID%>').value
            if (hdAckPopVisualization == "1") {

                debugger

                $('#MainContent_acknowledgeEmailSection').closest('.container').removeClass('hideProp')
                $("#MainContent_acknowledgeEmailSection").removeAttr("style");

                //$('#MainContent_gridviewRow').closest('.container-fluid').addClass('hideProp')
                //$('#MainContent_rowFilters').closest('.container-fluid').addClass('hideProp')
                //$('#MainContent_navsSection').closest('.container').removeClass('hideProp')
            }
            else {

                debugger

                //if (hdTabsVisualization == "1") {
                //    $('#MainContent_navsSection').closest('.container').removeClass('hideProp')
                //    $("#MainContent_navsSection").removeAttr("style");
                //    $('#MainContent_gridviewRow').closest('.container-fluid').addClass('hideProp')
                //    $('#MainContent_rowFilters').closest('.container-fluid').addClass('hideProp')
                //}
                //else {
                //    $('#MainContent_gridviewRow').closest('.container-fluid').removeClass('hideProp')
                //    $('#MainContent_rowFilters').closest('.container-fluid').removeClass('hideProp')
                //    $('#MainContent_navsSection').closest('.container').addClass('hideProp')
                //}

                $('#MainContent_acknowledgeEmailSection').closest('.container').removeClass('container hideProp')
                $('#MainContent_acknowledgeEmailSection').removeClass('container hideProp')

                $('#MainContent_acknowledgeEmailSection').closest('.container').addClass('container hideProp')
                $('#MainContent_acknowledgeEmailSection').addClass('container hideProp')

            }

            var hdInfoCustVisualization = document.getElementById('<%=hdInfoCustContent.ClientID%>').value
            if (hdInfoCustVisualization == "1") {

                debugger

                $('#MainContent_infoCustSection').closest('.container').removeClass('hideProp')
                $("#MainContent_infoCustSection").removeAttr("style");

                //$('#MainContent_gridviewRow').closest('.container-fluid').addClass('hideProp')
                //$('#MainContent_rowFilters').closest('.container-fluid').addClass('hideProp')
                //$('#MainContent_navsSection').closest('.container').removeClass('hideProp')
            }
            else {

                debugger

                //if (hdTabsVisualization == "1") {
                //    $('#MainContent_navsSection').closest('.container').removeClass('hideProp')
                //    $("#MainContent_navsSection").removeAttr("style");
                //    $('#MainContent_gridviewRow').closest('.container-fluid').addClass('hideProp')
                //    $('#MainContent_rowFilters').closest('.container-fluid').addClass('hideProp')
                //}
                //else {
                //    $('#MainContent_gridviewRow').closest('.container-fluid').removeClass('hideProp')
                //    $('#MainContent_rowFilters').closest('.container-fluid').removeClass('hideProp')
                //    $('#MainContent_navsSection').closest('.container').addClass('hideProp')
                //}

                $('#MainContent_infoCustSection').closest('.container').removeClass('container hideProp')
                $('#MainContent_infoCustSection').removeClass('container hideProp')

                $('#MainContent_infoCustSection').closest('.container').addClass('container hideProp')
                $('#MainContent_infoCustSection').addClass('container hideProp')

            }

            var hdRestockFlagVisualization = document.getElementById('<%=hdRestockFlag.ClientID%>').value
            if (hdRestockFlagVisualization == "1") {

                debugger

                $('#MainContent_pnRestockSection').closest('.container').removeClass('hideProp')
                $("#MainContent_pnRestockSection").removeAttr("style");

                //$('#MainContent_gridviewRow').closest('.container-fluid').addClass('hideProp')
                //$('#MainContent_rowFilters').closest('.container-fluid').addClass('hideProp')
                //$('#MainContent_navsSection').closest('.container').removeClass('hideProp')
            }
            else {

                debugger

                //if (hdTabsVisualization == "1") {
                //    $('#MainContent_navsSection').closest('.container').removeClass('hideProp')
                //    $("#MainContent_navsSection").removeAttr("style");
                //    $('#MainContent_gridviewRow').closest('.container-fluid').addClass('hideProp')
                //    $('#MainContent_rowFilters').closest('.container-fluid').addClass('hideProp')
                //}
                //else {
                //    $('#MainContent_gridviewRow').closest('.container-fluid').removeClass('hideProp')
                //    $('#MainContent_rowFilters').closest('.container-fluid').removeClass('hideProp')
                //    $('#MainContent_navsSection').closest('.container').addClass('hideProp')
                //}

                $('#MainContent_pnRestockSection').closest('.container').removeClass('container hideProp')
                $('#MainContent_pnRestockSection').removeClass('container hideProp')

                $('#MainContent_pnRestockSection').closest('.container').addClass('container hideProp')
                $('#MainContent_pnRestockSection').addClass('container hideProp')

            }

            var hdForceLoad = document.getElementById('<%=hdLoadAllData.ClientID%>').value
            if (hdForceLoad == "1") {                
                JSFunction();
                $('<%=hdLoadAllData.ClientID%>').val(0);
            }
        }

        function uploadcompleteAll() {
            alert("successfully uploaded All Files!");
        }  

        function uploaderror() {
            alert("sonme error occured while uploading file!");
        } 

        function fixVisibilityColumns() {
            //debugger

            $(".header-style").filter(function () {
                //debugger

                var myTd = $(this).children("td:has('.footermark')");
                return myTd.addClass('hidecol');
            });
        }

        function afterRadioCheck(hdFieldId, divId) {
            //debugger

            if (hdFieldId == 1) {
                divId.className = "collapse show"
            } else {
                divId.className = "collapse"
            }
        }

        function enableAjaxFileUpload() {
            //debugger

            //ajax__fileupload
            //$('.ajax__fileupload').find('input').attr('disabled', false);
            //$('.ajax__fileupload').find('input').prop('disabled', false);
            //$('.ajax__fileupload').find('input').attr('disabled', 'disabled');
            //$('#MainContent_fnAjUpd_SelectFileContainer').find('input').removeClass('aspNetDisabled');
            //$('#MainContent_fnAjUpd_SelectFileContainer').find('input').addClass('last');
           // $('.ajax__fileupload').find('input').removeAttr("disabled");

            //$('#MainContent_fnAjUpd_Html5InputFile').attr('disabled', 'disabled');
            //$('#MainContent_fnAjUpd_Html5InputFile').attr('disabled', false);
            //$('#MainContent_fnAjUpd_Html5InputFile').prop('disabled', false);
            //$('#MainContent_fnAjUpd_Html5InputFile').removeAttr("disabled");

            $('.ajax__fileupload').find('#MainContent_fnAjUpd_SelectFileContainer').removeClass('ajax__fileupload_selectFileContainer');
            $('#MainContent_fnAjUpd_SelectFileContainer').addClass('ajax__fileupload_selectFileContainer hideProp');

            $('.ajax__fileupload').find('#MainContent_fnAjUpd_QueueContainer').removeClass('ajax__fileupload_queueContainer');
            $('#MainContent_fnAjUpd_QueueContainer').addClass('ajax__fileupload_queueContainer hideProp');

            $('.ajax__fileupload').find('#MainContent_fnAjUpd_UploadOrCancelButton').removeClass('ajax__fileupload_uploadbutton');
            $('#MainContent_fnAjUpd_UploadOrCancelButton').addClass('ajax__fileupload_uploadbutton margin30Vert btn btn-primary btn-sm btnMidSize');

            $('.ajax__fileupload').find('#MainContent_fnAjUpd_ProgressBar').removeClass('ajax__fileupload_progressBar');
            $('#MainContent_fnAjUpd_ProgressBar').addClass('ajax__fileupload_progressBar hideProp');
            //$('#MainContent_fnAjUpd_Footer').find('.ajax__fileupload_ProgressBarHolder').addClass('ajax__fileupload_ProgressBarHolder hideProp');
            //$('#MainContent_fnAjUpd_QueueContainer').addClass('ajax__fileupload_queueContainer hideProp');

            //MainContent_fnAjUpd_QueueContainer
            //ajax__fileupload_queueContainer

        }

        $('body').on('click', '#MainContent_fnAjUpd_Html5InputFile', function () {

            alert("pepe");

        });

        function disableCustomInput() {
            //debugger 
            
            var fullSelection = document.getElementById('<%=hdFullDisabled.ClientID%>').value;
            var voidSelection = document.getElementById('<%=hdVoided.ClientID%>').value;
            var hdForceClosBtn = document.getElementById('<%=hdForceCloseBtn.ClientID%>').value;

            if (fullSelection == "0") {
                $('#MainContent_navsSection').find('input', 'textarea', 'button').attr('disabled', 'disabled');
                $('#MainContent_navsSection').find('select').attr('disabled', true);
                $('#MainContent_navsSection').find('textarea').attr('disabled', true);

                $('#tabc').find('a').removeClass('aspNetDisabled');
                $('#tabc').find('a').addClass('disableCtr');

                $('#MainContent_rowPnActions').find('a').removeClass('aspNetDisabled');
                $('#MainContent_rowPnActions').find('a').addClass('disableCtr');

                $('#rowGridViewSeeComm').find('a').removeClass('disableCtr');
                $('#rowGridViewSeeVndComm').find('a').removeClass('disableCtr');
                $('#MainContent_pnSubActionComment').find('input').attr('disabled', false);
                $('#MainContent_pnClaimComm').find('input').attr('disabled', false);
                $('#MainContent_pnClaimComm').find('textarea').attr('disabled', false);                
                //$('#MainContent_pnSubActionComment').find('input').attr('disabled', false);

                $('#MainContent_pnPartImage').find('a').removeClass('disableCtr');
                $('#MainContent_pnPartOEM').find('a').removeClass('disableCtr');

                $('#MainContent_btnSeeFiles').removeClass('disableCtr');
                $('#MainContent_btnAddFiles').removeClass('disableCtr');
                $('#MainContent_lnkSentToComm').removeClass('disableCtr');
                $('#MainContent_btnCloseTab').removeClass('disableCtr');
                //$('#MainContent_btnSaveTab').removeClass('disableCtr');

                $('#MainContent_lnkDiagnose').removeClass('disableCtr');


                if (hdForceClosBtn == "1") {
                    $('#MainContent_btnReopenClaim').addClass('hideProp');
                    $('#MainContent_btnCloseClaim').removeClass('hideProp');
                    $('#MainContent_btnCloseClaim').removeClass('disableCtr');
                }
                else {
                    $('#MainContent_btnCloseClaim').addClass('hideProp');
                    $('#MainContent_btnReopenClaim').removeClass('hideProp');
                    $('#MainContent_btnReopenClaim').removeClass('disableCtr');
                }  
            }
            else {
                $('#claimoverview').find('input', 'textarea', 'button').attr('disabled', 'disabled');
                $('#claimoverview').find('select').attr('disabled', true);
                $('#claimoverview').find('textarea').attr('disabled', true);

                $('#partinfo').find('input', 'textarea', 'button').attr('disabled', 'disabled');
                $('#partinfo').find('select').attr('disabled', true);
                $('#partinfo').find('textarea').attr('disabled', true);

                $('#MainContent_pnRestock').find('input').removeClass('aspNetDisabled');
                $('#MainContent_pnRestock').find('input').attr('disabled', false);

                $('#MainContent_ddlDiagnoseData').attr('disabled', false);
                $('#MainContent_chkQuarantine').attr('disabled', false);                  

                $('#MainContent_btnVoidClaim').removeClass('hideProp');
                $('#MainContent_btnVoidClaim').removeClass('disableCtr');

                $('#MainContent_btnSaveTab').attr('disabled', false);   
                $('#MainContent_lnkDiagnose').removeClass('disableCtr');  

            }

            if (voidSelection == "0") {
                $('#MainContent_navsSection').find('input', 'textarea', 'button').attr('disabled', 'disabled');
                $('#MainContent_navsSection').find('select').attr('disabled', true);
                $('#MainContent_navsSection').find('textarea').attr('disabled', true);

                $('#tabc').find('a').removeClass('aspNetDisabled');
                $('#tabc').find('a').addClass('disableCtr');

                $('#MainContent_rowPnActions').find('a').removeClass('aspNetDisabled');
                $('#MainContent_rowPnActions').find('a').addClass('disableCtr');

                $('#MainContent_btnSeeFiles').removeClass('disableCtr');
                $('#MainContent_btnAddFiles').removeClass('disableCtr');
                $('#MainContent_btnCloseTab').removeClass('disableCtr');
                $('#MainContent_btnCloseClaim').addClass('hideProp');
                $('#MainContent_btnVoidClaim').addClass('hideProp');
                $('#MainContent_lnkSentToComm').removeClass('disableCtr');

                $('#rowGridViewSeeComm').find('a').removeClass('disableCtr');
                $('#rowGridViewSeeVndComm').find('a').removeClass('disableCtr');

                $('#MainContent_rwCloseClaim').addClass('hideProp');
                $('#MainContent_lnkDiagnose').removeClass('disableCtr');
            }
            else {
                $('#claimoverview').find('input', 'textarea', 'button').attr('disabled', 'disabled');
                $('#claimoverview').find('select').attr('disabled', true);
                $('#claimoverview').find('textarea').attr('disabled', true);

                $('#partinfo').find('input', 'textarea', 'button').attr('disabled', 'disabled');
                $('#partinfo').find('select').attr('disabled', true);
                $('#partinfo').find('textarea').attr('disabled', true);

                $('#MainContent_pnRestock').find('input').removeClass('aspNetDisabled');
                $('#MainContent_pnRestock').find('input').attr('disabled', false);

                $('#MainContent_ddlDiagnoseData').attr('disabled', false);
                $('#MainContent_chkQuarantine').attr('disabled', false);

                $('#MainContent_btnVoidClaim').removeClass('hideProp');
                $('#MainContent_btnVoidClaim').removeClass('disableCtr');
                $('#MainContent_lnkDiagnose').removeClass('disableCtr');
            }

            $('.cData').attr('disabled', false);
            $('#MainContent_pnInformation').find('input').attr('disabled', false);   

            $('#MainContent_txtConsDamageTotal').attr('disabled', false);  
            $('#MainContent_txtConsDamageTotal').removeClass('aspNetDisabled');

            $('#MainContent_txtCDMisc').attr('disabled', 'disabled');  
            $('#MainContent_txtCDFreight').attr('disabled', 'disabled');  
            $('#MainContent_txtCDPart').attr('disabled', 'disabled');  
            $('#MainContent_txtCDLabor').attr('disabled', 'disabled');            

            $('#MainContent_btnGetTotalCDValue').attr('disabled', 'disabled');  
            $('#MainContent_btnSaveTab').removeClass('disableCtr');
            

           // $('#<%=lnkInitialReview.ClientID %>').removeClass('aspNetDisabled');
            //$('#<%=lnkInitialReview.ClientID %>').addClass('btn btn-primary btnSmallSize disableCtr');
        }

        function customExpandMultilineText() {
            var tField = document.getElementById('<%=txtMsgAftAckEmail.ClientID%>');
            var a1 = tField.scrollHeight;
            //tField.style.minHeight = a1 > 0 ? (tCustStat.scrollHeight) + "px" : ((tCustStat.scrollHeight) + 10) + "px";
            tField.style.minHeight = ((tField.scrollHeight) + 30) + "px";
        }

        function expandMultilineTxt() {
            //debugger 

            var tCustStat = document.getElementById('<%=txtCustStatement.ClientID%>');
            var tPartDesc = document.getElementById('<%=txtPartDesc.ClientID%>');
            var tMess = document.getElementById('<%=txtMessage.ClientID%>');
            var tMessVnd = document.getElementById('<%=txtVndMessage.ClientID%>');

            //tCustStat.style('width') = ((tCustStat.value.length) * 8) + 'px';
            var a1 = tCustStat.scrollHeight;
            var a2 = tPartDesc.scrollHeight;
            var a3 = tMess.scrollHeight;
            var a4 = tMessVnd.scrollHeight;

            //console.log(a1);
            //console.log(a2);
            //console.log(a3);
            //console.log(a4);

            tCustStat.style.minHeight = a1 > 0 ? ((tCustStat.scrollHeight) + 20) + "px" : ((tCustStat.scrollHeight) + 30) + "px";
            tPartDesc.style.minHeight = a2 > 0 ? (tPartDesc.scrollHeight) + "px" : ((tPartDesc.scrollHeight) + 10) + "px";
            tMess.style.minHeight = a3 > 0 ? ((tMess.scrollHeight) + 50) + "px" : ((tMess.scrollHeight) + 60) + "px";
            tMessVnd.style.minHeight = a4 > 0 ? (tMessVnd.scrollHeight) + "px" : ((tMessVnd.scrollHeight) + 10) + "px";


            var pp = $('<%=txtMessage.ClientID%>').val();
            

            //$('#MainContent_navsSection').find('textarea').attr('disabled', true);
            $('<%=txtMessage.ClientID%>').attr('disabled', false);
            $('<%=txtVndMessage.ClientID%>').attr('disabled', false);

        }

        function setHeight(control) {
            //debugger

            $(control).height(1);
            $(control).height($(control).prop('scrollHeight'));
        }
        
        function setVisSeeFile() {
            //debugger

            $('#<%=hdSeeFilesContent.ClientID %>').val("0");
        }

        function setQuarantine() {

            if ($('#<%=chkQuarantine.ClientID %>').is(':checked')) {

                $('#<%=txtQuarantine.ClientID %>').attr("disabled", false);
                $('#<%=txtQuarantineDate.ClientID %>').attr("disabled", false);

            }
        }

        function setVisAckPop() {
            debugger

            $('#<%=hdAckPopContent.ClientID %>').val("0");

            $('#<%=chkAcknowledgeEmail.ClientID %>').removeClass('disableCtr');
            $('#<%=chkAcknowledgeEmail.ClientID %>').removeClass('aspNetDisabled');
            $('#<%=chkAcknowledgeEmail.ClientID %>').attr('disabled', false); 
            $('#<%=chkAcknowledgeEmail.ClientID %>').prop('checked', false);

            $('#<%=lnkAcknowledgeEmail.ClientID %>').removeClass('aspNetDisabled'); 
            $('#<%=lnkAcknowledgeEmail.ClientID %>').removeClass('disableCtr');

            $('#<%=txtAcknowledgeEmail.ClientID %>').attr("disabled", false);
            $('#<%=txtAcknowledgeEmailDate.ClientID %>').attr("disabled", false);


            if (document.getElementById('<%=txtInitialReview.ClientID%>').value == "") {
                $('#<%=chkInitialReview.ClientID %>').removeClass('disableCtr');
                $('#<%=chkInitialReview.ClientID %>').removeClass('aspNetDisabled');
                $('#<%=chkInitialReview.ClientID %>').attr('disabled', false);
                $('#<%=chkInitialReview.ClientID %>').prop('checked', false);

                $('#<%=lnkInitialReview.ClientID %>').removeClass('aspNetDisabled');
                $('#<%=lnkInitialReview.ClientID %>').removeClass('disableCtr');

                $('#<%=txtInitialReview.ClientID %>').attr("disabled", false);
                $('#<%=txtInitialReviewDate.ClientID %>').attr("disabled", false);
            }
            else {
                var ppp = document.getElementById('<%=txtInitialReview.ClientID%>').value;
                var ee = ""
            }
        }

        function setVisInfoCust() {
            debugger

            $('#<%=hdInfoCustContent.ClientID %>').val("0");

            $('#<%=chkInfoCust.ClientID %>').removeClass('disableCtr');
            $('#<%=chkInfoCust.ClientID %>').removeClass('aspNetDisabled');
            $('#<%=chkInfoCust.ClientID %>').attr('disabled', false);
            $('#<%=chkInfoCust.ClientID %>').prop('checked', false);

            $('#<%=lnkInfoCust.ClientID %>').removeClass('aspNetDisabled');
            $('#<%=lnkInfoCust.ClientID %>').removeClass('disableCtr');

            $('#<%=txtInfoCust.ClientID %>').attr("disabled", false);
            $('#<%=txtInfoCustDate.ClientID %>').attr("disabled", false);


            if (document.getElementById('<%=txtInitialReview.ClientID%>').value == "") {
                $('#<%=chkInitialReview.ClientID %>').removeClass('disableCtr');
                $('#<%=chkInitialReview.ClientID %>').removeClass('aspNetDisabled');
                $('#<%=chkInitialReview.ClientID %>').attr('disabled', false);
                $('#<%=chkInitialReview.ClientID %>').prop('checked', false);

                $('#<%=lnkInitialReview.ClientID %>').removeClass('aspNetDisabled');
                $('#<%=lnkInitialReview.ClientID %>').removeClass('disableCtr');

                $('#<%=txtInitialReview.ClientID %>').attr("disabled", false);
                $('#<%=txtInitialReviewDate.ClientID %>').attr("disabled", false);
            }
            else if(document.getElementById('<%=txtAcknowledgeEmail.ClientID%>').value == "") {
                $('#<%=chkAcknowledgeEmail.ClientID %>').removeClass('disableCtr');
                $('#<%=chkAcknowledgeEmail.ClientID %>').removeClass('aspNetDisabled');
                $('#<%=chkAcknowledgeEmail.ClientID %>').attr('disabled', false);
                $('#<%=chkAcknowledgeEmail.ClientID %>').prop('checked', false);

                $('#<%=lnkAcknowledgeEmail.ClientID %>').removeClass('aspNetDisabled');
                $('#<%=lnkAcknowledgeEmail.ClientID %>').removeClass('disableCtr');

                $('#<%=txtAcknowledgeEmail.ClientID %>').attr("disabled", false);
                $('#<%=txtAcknowledgeEmailDate.ClientID %>').attr("disabled", false);
            }
            else {
                var ppp = document.getElementById('<%=txtInitialReview.ClientID%>').value;
                var ee = ""
            }
        }

        function setVisAckPop1() {
            //debugger

            $('#<%=hdAckPopContent.ClientID %>').val("0");
        }

        function activeTab() {

            //debugger
            var hd1 = document.getElementById('<%=hdCurrentActiveTab.ClientID%>').value;
            $('.nav-tabs a[href="' + hd1 + '"]').tab('show');
        }

        function processDDLSelection(filter) {
            //debugger

            if (filter == "MainContent_ddlSearchReason") {
                var hdRe = document.getElementById('<%=hdReason.ClientID%>').value;
                $("#<%=ddlSearchReason.ClientID%>").prop('selectedIndex', parseInt(hdRe));

            }
            else if (filter == "MainContent_ddlSearchDiagnose") {
                var hdDia = document.getElementById('<%=hdDiagnose.ClientID%>').value;
                $("#<%=ddlSearchDiagnose.ClientID%>").prop('selectedIndex', parseInt(hdDia));

            }
            else if (filter == "MainContent_ddlVndNo") {
                var hdVnd = document.getElementById('<%=hdVendorNo.ClientID%>').value;
                $("#<%=ddlVndNo.ClientID%>").prop('selectedIndex', parseInt(hdVnd));

            }
            else if (filter == "MainContent_ddlLocat") {
                var hdLoc = document.getElementById('<%=hdLocatIndex.ClientID%>').value;
                $("#<%=ddlLocat.ClientID%>").prop('selectedIndex', parseInt(hdLoc));

            }
            else if (filter == "MainContent_ddlSearchExtStatus") {
                var hdSt = document.getElementById('<%=hdStatusOut.ClientID%>').value;
                $("#<%=ddlSearchExtStatus.ClientID%>").prop('selectedIndex', parseInt(hdSt) + 1);

            }
            else if (filter == "MainContent_ddlSearchIntStatus") {
                var hdSti = document.getElementById('<%=hdStatusIn.ClientID%>').value;
                $("#<%=ddlSearchIntStatus.ClientID%>").prop('selectedIndex', parseInt(hdSti) + 1);

            }
            else if (filter == "MainContent_ddlSearchUser") {
                var hdUs = document.getElementById('<%=hdUserSelected.ClientID%>').value;
                $("#<%=ddlSearchUser.ClientID%>").prop('selectedIndex', parseInt(hdUs) + 1);

            }
            else if (filter == "MainContent_ddlDiagnoseData") {
                var hdDs1 = document.getElementById('<%=hdSelectedDiagnoseIndex.ClientID%>').value;
                //var hdDs1 = document.getElementById('<%=hdSelectedDiagnose.ClientID%>').selectedIndex;
                $("#<%=ddlDiagnoseData.ClientID%>").prop('selectedIndex', parseInt(hdDs1));

            }
            else if (filter == "MainContent_ddlLocation") {
                var hdLoc = document.getElementById('<%=hdLocatIndex.ClientID%>').value;
                $("#<%=ddlLocation.ClientID%>").prop('selectedIndex', parseInt(hdLoc));

            }
        }

        function yesnoCheckCustom(id) {
            //debugger

            if (id != "") {
                x = document.getElementById(id);
                xstyle = document.getElementById(id).style;

                var divs = ["rowUser", "rowIntStatus", "rowExtStatus", "rowDiagnose", "rowReason", "rowClaimNo", "rowDateInit", "rowCustomer", "rowPartNo", "rowType"];

                var i;
                for (i = 0; i < divs.length; i++) {
                    //text += divs[i] + "<br>";
                    if (divs[i] != id) {
                        //x = document.getElementById(divs[i]).style;
                        x = document.getElementById(divs[i]);
                        xstyle = x.style;
                        xstyle.display = "none";
                    } else {
                        //x = document.getElementById(divs[i]).style;
                        x = document.getElementById(divs[i]);
                        xstyle = x.style;
                        xstyle.display = "flex";
                        $('#<%=hiddenName.ClientID %>').val(id);
                        //x.display = "block";
                    }
                }
            }
        }

        function yesnoCheck(id) {
            //debugger

            x = document.getElementById(id);
            xstyle = document.getElementById(id).style;

            var divs = ["rowUser", "rowIntStatus", "rowExtStatus", "rowDiagnose", "rowReason", "rowClaimNo", "rowDateInit", "rowCustomer", "rowPartNo", "rowType"];

            var i;
            for (i = 0; i < divs.length; i++) {
                //text += divs[i] + "<br>";
                if (divs[i] != id) {
                    //x = document.getElementById(divs[i]).style;
                    x = document.getElementById(divs[i]);
                    xstyle = x.style;
                    xstyle.display = "none";
                } else {
                    //x = document.getElementById(divs[i]).style;
                    x = document.getElementById(divs[i]);
                    xstyle = x.style;
                    xstyle.display = "flex";
                    $('#<%=hiddenName.ClientID %>').val(id);
                    //x.display = "block";
                }
            }
            var collapse1 = document.getElementById('collapseOne');
            var collapse2 = document.getElementById('collapseOne_2');

            var hd2 = document.getElementById('<%=hiddenId2.ClientID%>').value;
            var hd1

            if (hd2 == 1) {
                $('#<%=hiddenId1.ClientID %>').val("1");
                hd1 = document.getElementById('<%=hiddenId1.ClientID%>').value;
            }
            else { hd1 = document.getElementById('<%=hiddenId1.ClientID%>').value; }

            afterRadioCheck(hd1, collapse1)
            afterRadioCheck(hd2, collapse2)
        }        

        function canCloseFunctionality() {
            //debugger 

            var hdCnClose = document.getElementById('<%=hdCanClose.ClientID%>').value;
            if (hdCnClose == "1") {

                //$('#MainContent_chkCanClose').attr('checked', true);
                $('#MainContent_chkCanClose').prop('checked', true);
                //$('.cg').attr('checked', true);
                //$('.cg').prop('checked', true);
            }
            else {
                //$('#MainContent_chkCanClose').attr('checked', false);
                $('#MainContent_chkCanClose').prop('checked', false);
                //$('.cg').attr('checked', false);
                //$('.cg').prop('checked', false);
            }
        }

        //General Methods End


        //Click Method Begin        

        $('body').on('click', '#MainContent_btnGetTemplate', function (e) {
            //debugger

            $('#<%=hdShowTemplate.ClientID %>').val("1")
            $('#MainContent_btnImportExcel').removeClass('hideProp')
        });

        // show import excel panel
        $('body').on('click', '#MainContent_btnAddFiles', function (e) {
            //debugger

            var hdFile = document.getElementById('<%=hdAddClaimFile.ClientID%>').value
            if (hdFile == "0") { $('#<%=hdAddClaimFile.ClientID %>').val("1"); }
            else { $('#<%=hdAddClaimFile.ClientID %>').val("0"); }
        });

        $('body').on('click', '#MainContent_btnImportExcel', function (e) {
            //debugger

            var hdFile = document.getElementById('<%=hdFileImportFlag.ClientID%>').value
            if (hdFile == "0")
                $('#<%=hdFileImportFlag.ClientID %>').val("1")
        });

        $('body').on('click', '#MainContent_btnExitComment', function (e) {
            //debugger

            $('#<%=hdAddComments.ClientID %>').val("0")
            $('#<%=hdAddVndComments.ClientID %>').val("0")

            $('#<%=hdSeeComments.ClientID %>').val("0")
            $('#<%=hdSeeVndComments.ClientID %>').val("0")
        });

        $('body').on('click', '#MainContent_btnVndExitComment', function (e) {
            //debugger

            $('#<%=hdAddComments.ClientID %>').val("0")
            $('#<%=hdAddVndComments.ClientID %>').val("0")

            $('#<%=hdSeeComments.ClientID %>').val("0")
            $('#<%=hdSeeVndComments.ClientID %>').val("0")
        });

        $('body').on('click', '#MainContent_btnAddComments', function (e) {
            //debugger

            var hdFile = document.getElementById('<%=hdDisplayAddVndClaim.ClientID%>').value
            if (hdFile == "0") {
                //$('#<%=hdDisplayAddVndClaim.ClientID %>').val("1")
                $('#<%=hdAddComments.ClientID %>').val("0")
                $('#<%=hdAddVndComments.ClientID %>').val("1")
            }
            else {
                $('#<%=hdAddComments.ClientID %>').val("1")
                $('#<%=hdAddVndComments.ClientID %>').val("0")
            }

            $('#<%=hdSeeComments.ClientID %>').val("0")
            $('#<%=hdSeeVndComments.ClientID %>').val("0")
        });

        $('body').on('click', '#MainContent_btnSeeComments', function (e) {
            //debugger

            var hdFile = document.getElementById('<%=hdDisplaySeeVndClaim.ClientID%>').value
            if (hdFile == "0") {
                <%--$('#<%=hdDisplaySeeVndClaim.ClientID %>').val("1")
                $('#<%=hdDisplayAddVndClaim.ClientID %>').val("0")--%>

                $('#<%=hdSeeComments.ClientID %>').val("0")
                $('#<%=hdSeeVndComments.ClientID %>').val("1")
            }
            else {
                $('#<%=hdSeeComments.ClientID %>').val("1")
                $('#<%=hdSeeVndComments.ClientID %>').val("0")
            }

            $('#<%=hdAddComments.ClientID %>').val("0")
            $('#<%=hdAddVndComments.ClientID %>').val("0")
        });

        $('body').on('click', '#MainContent_btnExitSeeVndClaim', function (e) {
            //debugger

            var hdFile = document.getElementById('<%=hdDisplaySeeVndClaim.ClientID%>').value
            if (hdFile == "1")
                $('#<%=hdDisplaySeeVndClaim.ClientID %>').val("0")
        });

        <%--$('body').on('click', '#MainContent_btnAddComments', function (e) {
            //debugger

            var hdFile = document.getElementById('<%=hdAddComments.ClientID%>').value
            if (hdFile == "0")
                $('#<%=hdAddComments.ClientID %>').val("1")
        });--%>

        $('body').on('click', '#MainContent_btnSave', function (e) {
            //debugger

            $('#<%=hdShowTemplate.ClientID %>').val("0")
            $('#MainContent_btnImportExcel').addClass('hideProp')
        });

        //close import excel panel
        $('body').on('click', "#MainContent_btnBack", function (e) {
            //debugger

            var hdFile = document.getElementById('<%=hdFileImportFlag.ClientID%>').value
            if (hdFile == "1")
                $('#<%=hdFileImportFlag.ClientID %>').val("0")
        });        

        $('body').on('click', "#MainContent_btnBackFile", function (e) {
            //debugger

            var hdFile = document.getElementById('<%=hdAddClaimFile.ClientID%>').value
            if (hdFile == "1")
                $('#<%=hdAddClaimFile.ClientID %>').val("0")
        });

        $('body').on('click', '#MainContent_btnSentToComm', function (e) {

            activeTab();
        });

        //Click Method End

        $('body').on('change', "#<%=chkApproved.ClientID %>", function () {
            //debugger

            if (this.checked) {
                //$('#<%= pnCloseClaim.ClientID %>').removeClass("aspNetDisabled");
                $('#<%= pnCloseClaim.ClientID %>').attr("disabled", false);
                $('#<%= pnCloseClaim.ClientID %> input').attr("disabled", false);
                $('#<%= pnCloseClaim.ClientID %> a').attr("disabled", false);
                $('#<%= btnCloseClaim.ClientID %>').attr("disabled", false);
              
            }
        });

        $('body').on('change', "#<%=chkDeclined.ClientID %>", function () {
            //debugger

            if (this.checked) {
                //$('#<%= pnCloseClaim.ClientID %>').removeClass("aspNetDisabled");
                $('#<%= pnCloseClaim.ClientID %>').attr("disabled", false);
                $('#<%= pnCloseClaim.ClientID %> input').attr("disabled", false);
                $('#<%= pnCloseClaim.ClientID %> a').attr("disabled", false);
                $('#<%= btnCloseClaim.ClientID %>').attr("disabled", false);
            }
        });

        $('body').on('change', "#<%=chkAcknowledgeEmail.ClientID %>", function () {
            debugger
            
            if ($(this).is(':checked')) {
                //$('#<%= pnCloseClaim.ClientID %>').removeClass("aspNetDisabled");
                $('#<%= pnCloseClaim.ClientID %>').attr("disabled", false);
                $('#<%= pnCloseClaim.ClientID %> input').attr("disabled", false);
                $('#<%= pnCloseClaim.ClientID %> a').attr("disabled", false);
                $('#<%= btnCloseClaim.ClientID %>').attr("disabled", false);

                //$('#MainContent_rwAckEmailMsg').closest('.form-row').removeClass('hideProp');
                //$('#<%=hdShowAckMsgForm.ClientID %>').val('1');
            }
            else {
                //$('#MainContent_rwAckEmailMsg').removeClass('form-row paddingVert');
                //$('#MainContent_rwAckEmailMsg').addClass('form-row paddingVert hideProp');    

                //$('#<%=hdShowAckMsgForm.ClientID %>').val('0');
            }
        });

        $('body').on('change', "#<%=chkInfoCust.ClientID %>", function () {
            debugger

            if ($(this).is(':checked')) {
                //$('#<%= pnCloseClaim.ClientID %>').removeClass("aspNetDisabled");
                $('#<%= pnCloseClaim.ClientID %>').attr("disabled", false);
                $('#<%= pnCloseClaim.ClientID %> input').attr("disabled", false);
                $('#<%= pnCloseClaim.ClientID %> a').attr("disabled", false);
                $('#<%= btnCloseClaim.ClientID %>').attr("disabled", false);

                //$('#MainContent_rwAckEmailMsg').closest('.form-row').removeClass('hideProp');
                //$('#<%=hdShowAckMsgForm.ClientID %>').val('1');
            }
            else {
                //$('#MainContent_rwAckEmailMsg').removeClass('form-row paddingVert');
                //$('#MainContent_rwAckEmailMsg').addClass('form-row paddingVert hideProp');    

                //$('#<%=hdShowAckMsgForm.ClientID %>').val('0');
            }
        });

        //Change Method Begin

        $('body').on('change', "#<%=ddlSearchExtStatus.ClientID %>", function () {
            var value = document.getElementById("<%=ddlSearchExtStatus.ClientID %>");
            var gettext = value.options[value.selectedIndex].text;
            var getindex = value.options[value.selectedIndex].value;
            $('#<%=hdStatusOut.ClientID %>').val(getindex);

            var value1 = document.getElementById("<%=ddlSearchExtStatus.ClientID %>").id;
            $('#<%=selectedFilter.ClientID %>').val(value1);

        });

        $('body').on('change', "#<%=ddlSearchIntStatus.ClientID %>", function () {
            var value = document.getElementById("<%=ddlSearchIntStatus.ClientID %>");
            var gettext = value.options[value.selectedIndex].text;
            var getindex = value.options[value.selectedIndex].value;
            $('#<%=hdStatusIn.ClientID %>').val(getindex);

            <%--var value1 = document.getElementById("<%=ddlSearchIntStatus.ClientID %>").id;
            $('#<%=selectedFilter.ClientID %>').val(value1);--%>

        });

        $('body').on('change', "#<%=ddlSearchUser.ClientID %>", function () {
            var value = document.getElementById("<%=ddlSearchUser.ClientID %>");
            var gettext = value.options[value.selectedIndex].text;
            var getindex = value.options[value.selectedIndex].value;
            $('#<%=hdUserSelected.ClientID %>').val(getindex);

            <%--var value1 = document.getElementById("<%=ddlSearchIntStatus.ClientID %>").id;
            $('#<%=selectedFilter.ClientID %>').val(value1);--%>

        });

        $('body').on('change', "#<%=ddlDiagnoseData.ClientID %>", function () {
            //debugger

            var value = document.getElementById("<%=ddlDiagnoseData.ClientID %>");
            var gettext = value.options[value.selectedIndex].text;
            var getindex = value.options[value.selectedIndex].value;
            $('#<%=ddlDiagnoseData.ClientID %>').val(getindex);

            var value1 = document.getElementById("<%=ddlDiagnoseData.ClientID %>").id;            
            //$('#<%=hdSelectedDiagnoseIndex.ClientID %>').val(getindex);
            //$('#<%=hdSelectedDiagnose.ClientID %>').val(gettext);
        });

        $('body').on('change', "#<%=ddlSearchDiagnose.ClientID %>", function () {
            var value = document.getElementById("<%=ddlSearchDiagnose.ClientID %>");
            var gettext = value.options[value.selectedIndex].text;
            var getindex = value.options[value.selectedIndex].value;
            $('#<%=hdDiagnose.ClientID %>').val(getindex);

            var value1 = document.getElementById("<%=ddlSearchDiagnose.ClientID %>").id;
            $('#<%=selectedFilter.ClientID %>').val(value1);
        });

        $('body').on('change', "#<%=ddlVndNo.ClientID %>", function () {
            var value = document.getElementById("<%=ddlVndNo.ClientID %>");
            var gettext = value.options[value.selectedIndex].text;
            var getindex = value.options[value.selectedIndex].value;
            $('#<%=hdVendorNo.ClientID %>').val(getindex);

            var value1 = document.getElementById("<%=ddlVndNo.ClientID %>").id;
            //$('#<%=selectedFilter.ClientID %>').val(value1);
        });

        $('body').on('change', "#<%=ddlLocat.ClientID %>", function () {           

            var value = document.getElementById("<%=ddlLocat.ClientID %>");
            var gettext = value.options[value.selectedIndex].text;
            var getindex = value.options[value.selectedIndex].value;
            $('#<%=hdLocatNo.ClientID %>').val(getindex);

            var value1 = document.getElementById("<%=ddlLocat.ClientID %>").id;
            //$('#<%=selectedFilter.ClientID %>').val(value1);
        });        

        $('body').on('change', "#<%=ddlSearchReason.ClientID %>", function () {
            //debugger

            var value = document.getElementById("<%=ddlSearchReason.ClientID %>");            
            var gettext = value.options[value.selectedIndex].text;
            var getindex = value.options[value.selectedIndex].value;  
            $('#<%=hdReason.ClientID %>').val(getindex);  

            var value1 = document.getElementById("<%=ddlSearchReason.ClientID %>").id;
            $('#<%=selectedFilter.ClientID %>').val(value1);             
            
         });        

        function checkHdImportExcel(control) {
            var hdFile = document.getElementById('<%=hdFileImportFlag.ClientID%>').value
            if (hdFile == "0")
                $('#<%=hdFileImportFlag.ClientID %>').val("1")
            else
                $('#<%=hdFileImportFlag.ClientID %>').val("0")
        }

        //MainContent_ddlDiagnoseData
        $('body').on('change', "#<%=ddlDiagnoseData.ClientID %>", function () {
            //debugger

            var valuee = $('#<%=ddlDiagnoseData.ClientID %> option:selected').text();
            var valueid = $('#<%=ddlDiagnoseData.ClientID %> option:selected').index();

            <%--$('#<%=txtDiagnoseData.ClientID %>').val(valuee); --%>
            $('#<%=hdSelectedDiagnose.ClientID %>').val(valuee);
            $('#<%=hdSelectedDiagnoseIndex.ClientID %>').val(valueid);

        });        

        //Change Method End      

        //Autocomplete Method Begin

        function claimNoAutoComplete() {
            //debugger

            $(".autosuggestclaim").autocomplete({
                source: function (request, response) {
                    $.ajax({
                        type: "POST",
                        contentType: "application/json;charset=utf-8",
                        url: "CustomerClaims.aspx/GetAutoCompleteDataClaimNo",
                        data: "{'prefixText':'" + document.getElementById("<%=txtClaimNo.ClientID %>").value + "'}",
                        dataType: "json",
                        autoFocus: true,
                        success: function (data) {
                            response(data.d);
                        },
                        error: function (result) {
                            alert("Error");
                        }
                    });
                },
                select: function (event, ui) {
                    var autocomplete_value = ui.item;
                    $("#<%=hdClaimNoSelected.ClientID %>").val(autocomplete_value.value);
                    //__doPostBack("#<%=hdClaimNoSelected.ClientID %>", "");
                }
            });
        }

        function PartNoAutoComplete() {
            $(".autosuggestpart").autocomplete({
                source: function (request, response) {
                    $.ajax({
                        type: "POST",
                        contentType: "application/json;charset=utf-8",
                        url: "Default.aspx/GetAutoCompleteDataPartNo",
                        data: "{'prefixText':'" + document.getElementById("<%=txtPartNo.ClientID %>").value + "'}",
                        dataType: "json",
                        autoFocus: true,
                        success: function (data) {
                            response(data.d);
                        },
                        error: function (result) {
                            alert("Error");
                        }
                    });
                },
                select: function (event, ui) {
                    var autocomplete_value = ui.item;
                    //alert(autocomplete_value.value);
                    $("#<%=hdPartNoSelected.ClientID %>").val(autocomplete_value.value);
                    //__doPostBack("#<%=hdPartNoSelected.ClientID %>", "");
                }
            });
        }

        function CustomerNoAutoComplete() {
            $(".autosuggestcustomer").autocomplete({
                source: function (request, response) {
                    $.ajax({
                        type: "POST",
                        contentType: "application/json;charset=utf-8",
                        url: "Default.aspx/GetAutoCompleteDataCustomerNo",
                        data: "{'prefixText':'" + document.getElementById("<%=txtCustomer.ClientID %>").value + "'}",
                        dataType: "json",
                        autoFocus: true,
                        success: function (data) {
                            response(data.d);
                        },
                        error: function (result) {
                            alert("Error");
                        }
                    });
                },
                select: function (event, ui) {
                    var autocomplete_value = ui.item;
                    $("#<%=hdCustomerNoSelected.ClientID %>").val(autocomplete_value.value);
                   // __doPostBack("#<%=hdCustomerNoSelected.ClientID %>", "");
                }
            });
        }

        //Autocomplete Method End

        var divname;  

        $(function () {

            //debugger

            console.log("BeginFunction");  

            //addZBox();

            var watermarkSearch = 'Search...';

            var hd1 = document.getElementById('<%=hiddenId1.ClientID%>').value;
            var hd2 = document.getElementById('<%=hiddenId2.ClientID%>').value;

            var collapse2 = document.getElementById('collapseOne_2');
            afterDdlCheck(hd2, collapse2);

            var collapse1 = document.getElementById('collapseOne');
            afterDdlCheck(hd1, collapse1);   

            //claimNoAutoComplete()
            //PartNoAutoComplete()
            //CustomerNoAutoComplete() 
            
            divexpandcollapse(divname)
            
            $('#MainContent_txtDateEntered').datepicker(
                {
                    dateFormat: 'mm/dd/yy',
                    changeMonth: true,
                    changeYear: true,
                    yearRange: '1900:2100'
                }); 

            $('#MainContent_txtInstDate').datepicker(
                {
                    dateFormat: 'mm/dd/yy',
                    changeMonth: true,
                    changeYear: true,
                    yearRange: '1900:2100'
                });

            $('#MainContent_txtQuarantineDate').datepicker(
                {
                    dateFormat: 'mm/dd/yy',
                    changeMonth: true,
                    changeYear: true,
                    yearRange: '1900:2100'
                });

            $('#MainContent_txtClaimAuthDate').datepicker(
                {
                    dateFormat: 'mm/dd/yy',
                    changeMonth: true,
                    changeYear: true,
                    yearRange: '1900:2100'
                });

            $('#MainContent_txtInitialReviewDate').datepicker(
                {
                    dateFormat: 'mm/dd/yy',
                    changeMonth: true,
                    changeYear: true,
                    yearRange: '1900:2100'
                });

            $('#MainContent_txtAcknowledgeEmailDate').datepicker(
                {
                    dateFormat: 'mm/dd/yy',
                    changeMonth: true,
                    changeYear: true,
                    yearRange: '1900:2100'
                });

            $('#MainContent_txtWaitSupReviewDate').datepicker(
                {
                    dateFormat: 'mm/dd/yy',
                    changeMonth: true,
                    changeYear: true,
                    yearRange: '1900:2100'
                });

            $('#MainContent_txtInfoCustDate').datepicker(
                {
                    dateFormat: 'mm/dd/yy',
                    changeMonth: true,
                    changeYear: true,
                    yearRange: '1900:2100'
                });

            $('#MainContent_txtPartRequestedDate').datepicker(
                {
                    dateFormat: 'mm/dd/yy',
                    changeMonth: true,
                    changeYear: true,
                    yearRange: '1900:2100'
                });

            $('#MainContent_txtPartReceivedDate').datepicker(
                {
                    dateFormat: 'mm/dd/yy',
                    changeMonth: true,
                    changeYear: true,
                    yearRange: '1900:2100'
                });

            $('#MainContent_txtTechReviewDate').datepicker(
                {
                    dateFormat: 'mm/dd/yy',
                    changeMonth: true,
                    changeYear: true,
                    yearRange: '1900:2100'
                });

            $('#MainContent_txtClaimCompletedDate').datepicker(
                {
                    dateFormat: 'mm/dd/yy',
                    changeMonth: true,
                    changeYear: true,
                    yearRange: '1940:2100'
                });

            $('#MainContent_txtInvoiceDate').datepicker(
                {
                    dateFormat: 'mm/dd/yy',
                    changeMonth: true,
                    changeYear: true,
                    yearRange: '1940:2100'
                });

            $('#MainContent_txtInvoiceDate1').datepicker(
                {
                    dateFormat: 'mm/dd/yy',
                    changeMonth: true,
                    changeYear: true,
                    yearRange: '1940:2100'
                });

            $.datepicker.setDefaults($.datepicker.regional['en']);            

            var dateFormat = "mm/dd/yy",
                from = $("#<%= txtDateInit.ClientID %>")
                    .datepicker({
                        defaultDate: "+1w",
                        changeMonth: true,
                        dateFormat: 'mm/dd/yy',
                        autoClose: true,
                        numberOfMonths: 3
                    })
                    .on("change", function () {
                        to.datepicker("option", "minDate", getDate(this));
                    }),
                to = $("#<%= txtDateTo.ClientID %>").datepicker({
                    defaultDate: "+1w",
                    changeMonth: true,
                    dateFormat: 'mm/dd/yy',
                    autoClose: true,
                    numberOfMonths: 3
                })
                    .on("change", function () {
                        from.datepicker("option", "maxDate", getDate(this));
                    });

            function getDate(element) {
                //debugger

                var date;
                try {
                    date = $.datepicker.parseDate(dateFormat, element.value);
                } catch (error) {
                    date = null;
                }

                return date;
            }

            fixVisibilityColumns();

            setHeight($('#MainContent_txtCustStatement'));

            //$(window).scrollTop(0);

            enableAjaxFileUpload();
            
            console.log("EndFunction");

        });          

        var prmInstance = Sys.WebForms.PageRequestManager.getInstance();
        prmInstance.add_endRequest(function () {
            //you need to re-bind your jquery events here
            //debugger

            claimNoAutoComplete();
            PartNoAutoComplete();
            CustomerNoAutoComplete();

            prm_EndRequest();
        });  

        function execDatePickers() {
            $('#MainContent_txtDateEntered').datepicker(
                {
                    dateFormat: 'mm/dd/yy',
                    changeMonth: true,
                    changeYear: true,
                    yearRange: '1900:2100'
                });

            $('#MainContent_txtInstDate').datepicker(
                {
                    dateFormat: 'mm/dd/yy',
                    changeMonth: true,
                    changeYear: true,
                    yearRange: '1900:2100'
                });

            $('#MainContent_txtQuarantineDate').datepicker(
                {
                    dateFormat: 'mm/dd/yy',
                    changeMonth: true,
                    changeYear: true,
                    yearRange: '1900:2100'
                });

            $('#MainContent_txtClaimAuthDate').datepicker(
                {
                    dateFormat: 'mm/dd/yy',
                    changeMonth: true,
                    changeYear: true,
                    yearRange: '1900:2100'
                });

            $('#MainContent_txtInitialReviewDate').datepicker(
                {
                    dateFormat: 'mm/dd/yy',
                    changeMonth: true,
                    changeYear: true,
                    yearRange: '1900:2100'
                });

            $('#MainContent_txtAcknowledgeEmailDate').datepicker(
                {
                    dateFormat: 'mm/dd/yy',
                    changeMonth: true,
                    changeYear: true,
                    yearRange: '1900:2100'
                });

            $('#MainContent_txtWaitSupReviewDate').datepicker(
                {
                    dateFormat: 'mm/dd/yy',
                    changeMonth: true,
                    changeYear: true,
                    yearRange: '1900:2100'
                });

            $('#MainContent_txtInfoCustDate').datepicker(
                {
                    dateFormat: 'mm/dd/yy',
                    changeMonth: true,
                    changeYear: true,
                    yearRange: '1900:2100'
                });

            $('#MainContent_txtPartRequestedDate').datepicker(
                {
                    dateFormat: 'mm/dd/yy',
                    changeMonth: true,
                    changeYear: true,
                    yearRange: '1900:2100'
                });

            $('#MainContent_txtPartReceivedDate').datepicker(
                {
                    dateFormat: 'mm/dd/yy',
                    changeMonth: true,
                    changeYear: true,
                    yearRange: '1900:2100'
                });

            $('#MainContent_txtTechReviewDate').datepicker(
                {
                    dateFormat: 'mm/dd/yy',
                    changeMonth: true,
                    changeYear: true,
                    yearRange: '1900:2100'
                });

            $('#MainContent_txtClaimCompletedDate').datepicker(
                {
                    dateFormat: 'mm/dd/yy',
                    changeMonth: true,
                    changeYear: true,
                    yearRange: '1900:2100'
                });

            $('#MainContent_txtInvoiceDate').datepicker(
                {
                    dateFormat: 'mm/dd/yy',
                    changeMonth: true,
                    changeYear: true,
                    yearRange: '1940:2100'
                });

            $('#MainContent_txtInvoiceDate1').datepicker(
                {
                    dateFormat: 'mm/dd/yy',
                    changeMonth: true,
                    changeYear: true,
                    yearRange: '1940:2100'
                });

            $('#MainContent_txtAddCommDateInit').datepicker(
                {
                    dateFormat: 'mm/dd/yy',
                    changeMonth: true,
                    changeYear: true,
                    yearRange: '1940:2100'
                });

            $('#MainContent_txtAddVndCommDateInit').datepicker(
                {
                    dateFormat: 'mm/dd/yy',
                    changeMonth: true,
                    changeYear: true,
                    yearRange: '1940:2100'
                });

            $.datepicker.setDefaults($.datepicker.regional['en']);
        }

        function pageLoad(event, args) {
            debugger

            setUpdPnVisibility(false);
          
            console.log("BeginPageLoad");

            <%--var hdChPgLo = document.getElementById('<%=hdChangePageLoad.ClientID%>').value;
            if (hdChPgLo != "") {

                if (hdChPgLo == "1")
                {

                    $('#<%=hdGridViewContent.ClientID %>').val("0");
                    $('#<%=hdNavTabsContent.ClientID %>').val("1");

                    contentVisual();
                }
                else
                {

                    $('#<%=hdGridViewContent.ClientID %>').val("1");
                    $('#<%=hdNavTabsContent.ClientID %>').val("0");

                    contentVisual();
                }

            } --%>         

            enableAjaxFileUpload();

            var hdTEst = document.getElementById('<%=hdTestPath.ClientID%>').value
            if (hdTEst != "") {
                console.log(hdTEst);
                $('#<%=hdTestPath.ClientID %>').val("");
            }            

            execDatePickers();

            contentVisual();

            //addZBox();
           
            //$("#navsSection").removeAttr("style");

            if (args.get_isPartialLoad()) {  

                debugger

                setUpdPnVisibility(false);

                //addZBox();

                //case fileExcel  
                var hdFile = document.getElementById('<%=hdFileImportFlag.ClientID%>').value
                if (hdFile == "1") {
                    $('#MainContent_loadFileSection').closest('.container').removeClass('hideProp')
                } 

                var hdAddClaimFile = document.getElementById('<%=hdAddClaimFile.ClientID%>').value
                if (hdAddClaimFile == "1") {
                    $('#MainContent_AddFilesSection').closest('.container').removeClass('hideProp');
                    $('#MainContent_navsSection').closest('.container').addClass('hideProp');
                }
                else {
                    $('#MainContent_AddFilesSection').addClass('hideProp');
                    $('#MainContent_navsSection').closest('.container').removeClass('hideProp');
                }

                <%--var hdDisplaySeeVndClaim = document.getElementById('<%=hdDisplaySeeVndClaim.ClientID%>').value
                if (hdDisplaySeeVndClaim == "1") {
                    $('#MainContent_seeVendorComments').closest('.container').removeClass('hideProp')
                } else {
                    $('#MainContent_seeVendorComments').addClass('hideProp')
                }--%>

                var hdAddVndComments = document.getElementById('<%=hdAddVndComments.ClientID%>').value
                if (hdAddVndComments == "1") {
                    $('#MainContent_addVendorComments').closest('.container').removeClass('hideProp')
                } else {
                    $('#MainContent_addVendorComments').addClass('hideProp')
                }

                var hdAddComments = document.getElementById('<%=hdAddComments.ClientID%>').value
                if (hdAddComments == "1") {
                    $('#MainContent_addCommentsR').closest('.container').removeClass('hideProp')
                } else {
                    $('#MainContent_addCommentsR').addClass('hideProp')
                }

                var hdSeeVndComments = document.getElementById('<%=hdSeeVndComments.ClientID%>').value
                if (hdSeeVndComments == "1") {
                    $('#MainContent_seeVendorComments').closest('.container').removeClass('hideProp')
                } else {
                    $('#MainContent_seeVendorComments').addClass('hideProp')
                }

                var hdSeeComments = document.getElementById('<%=hdSeeComments.ClientID%>').value
                if (hdSeeComments == "1") {
                    $('#MainContent_seeCommentsR').closest('.container').removeClass('hideProp')
                } else {
                    $('#MainContent_seeCommentsR').addClass('hideProp')
                }

                var hdShowBtn = document.getElementById('<%=hdShowTemplate.ClientID%>').value;
                if (hdShowBtn = "1") {
                    $('#MainContent_btnImportExcel').removeClass('hideProp')
                }
                else {
                    $('#MainContent_btnImportExcel').addClass('hideProp')
                }

                var hdSeeCommDef = document.getElementById('<%=hdGetCommentTab.ClientID%>').value;
                if (hdSeeCommDef == "1") {
                    $('#MainContent_rowSeeComments').removeClass('hideProp');
                }
                else {
                    $('#MainContent_rowSeeComments').addClass('hideProp');
                }

                var hdCloseBtn = document.getElementById('<%=hdShowCloseBtn.ClientID%>').value;
                if (hdCloseBtn == "1") {
                    $('#MainContent_rwCloseClaim').removeClass('hideProp');
                }
                else {
                    $('#MainContent_rwCloseClaim').addClass('hideProp');
                }

                var hd = document.getElementById('<%=hdLinkExpand.ClientID%>').value;  
                $('#<%=hdLinkExpand.ClientID %>').val("0"); 

                setClassFA();

                contentVisual();

                fixVisibilityColumns();

                setHeight($('#MainContent_txtCustStatement'));

                activeTab();

                fixesSmallBtnClass();  

                DefaulSeeComm();

                var hdWelcome = document.getElementById('<%=hdWelcomeMess.ClientID%>').value
                $('#<%=lblUserLogged.ClientID %>').val(hdWelcome); 

                setTabsClaimNo()

                partialCreditSelected()                

                expandMultilineTxt() //page load update panel

                disableCustomInput();

                EnableAuthRequestChk()

                enableAjaxFileUpload();

                SetReopenBtn();

                //customExpandMultilineText();

                AcknowledgeEmailBuild();

                InfoCustomerBuild();

                canCloseFunctionality();

                //setQuarantine();

                //$(window).scrollTop(0);

            }

            function addZBox() {
                //debugger

                $(".zb").zbox({ margin: 40 });
            }

            var hdWelcome = document.getElementById('<%=hdWelcomeMess.ClientID%>').value
            $('#<%=lblUserLogged.ClientID %>').val(hdWelcome); 
            

            <%--var hdGridVisualization = document.getElementById('<%=hdGridViewContent.ClientID%>').value
                if (hdGridVisualization == "1") {
                    $('#MainContent_gridviewRow').closest('.container-fluid').removeClass('hideProp')
                }
                else {
                    $('#MainContent_gridviewRow').closest('.container-fluid').addClass('hideProp')
                }

            var hdTabsVisualization = document.getElementById('<%=hdNavTabsContent.ClientID%>').value
            if (hdTabsVisualization == "1") {
                $('#MainContent_navsSection').closest('.container').removeClass('hideProp')
            }
            else {
                $('#MainContent_navsSection').closest('.container').addClass('hideProp')
            }--%>

            var hd1 = document.getElementById('<%=hiddenId1.ClientID%>').value;
            var hd2 = document.getElementById('<%=hiddenId2.ClientID%>').value;

            var hdName = document.getElementById('<%=hiddenName.ClientID%>').value;
            //$('#accordion_2 h5 a').click(function () {

            yesnoCheckCustom(hdName)  

            var collapse2 = document.getElementById('collapseOne_2');
            afterDdlCheck(hd2, collapse2);

            var collapse1 = document.getElementById('collapseOne');
            afterDdlCheck(hd1, collapse1);  

            claimNoAutoComplete()
            PartNoAutoComplete()
            CustomerNoAutoComplete()

            processDDLSelection("MainContent_ddlDiagnoseData");
            processDDLSelection("MainContent_ddlLocation");

            setHeight($('#MainContent_txtCustStatement'));
            
            var hdFil = document.getElementById('<%=selectedFilter.ClientID%>').value;
            //processDDLSelection(hdFil)            
            $.datepicker.setDefaults($.datepicker.regional['en']);            

            rangePicker1();

            //rangePicker2();

            //rangePicker3();

            fixVisibilityColumns();

            setTabsClaimNo()

            partialCreditSelected()            

            //setClassFA();

            contentVisual();

            expandMultilineTxt() //page load outer

            disableCustomInput();

            EnableAuthRequestChk()

            SetReopenBtn();

            AcknowledgeEmailBuild();

            InfoCustomerBuild();

            //setQuarantine();

            //$(window).scrollTop(0);

            //__doPostBack()

            //customExpandMultilineText();

            canCloseFunctionality();

            console.log("EndPageLoad");
        }

        function AutomaticBack() {
            //debugger

            $('#<%=hdAddClaimFile.ClientID %>').val("0")

            //alert("pepe");
            JSFunction();
        }

        function EnableAuthRequestChk() {
            //debugger

            var hdAuthReq = document.getElementById('<%=txtTotValue.ClientID%>').value;
            var isPresentBl = document.getElementById('<%=chkClaimAuth.ClientID%>').hasAttribute("disabled");
            var userSelected = document.getElementById('<%=txtClaimAuth.ClientID%>').value;
            var userDateSelected = document.getElementById('<%=txtClaimAuthDate.ClientID%>').value;
            var hdUserType = $('#<%=IsFullUser.ClientID %>').val();
                        
            if (hdAuthReq != "") {
                var numbAuthreq = parseInt(hdAuthReq)
                if (numbAuthreq > 500) {

                    if (isPresentBl && hdUserType == "1") {

                        $('#MainContent_chkClaimAuth').closest('span').removeClass('aspNetDisabled');
                        $('#<%=chkClaimAuth.ClientID%>').closest('span').removeClass('aspNetDisabled');

                        $('#<%=chkClaimAuth.ClientID %>').removeAttr("disabled");
                        $('#<%=txtClaimAuth.ClientID %>').removeAttr("disabled");
                        $('#<%=txtClaimAuthDate.ClientID %>').removeAttr("disabled");

                        $('#<%=lnkClaimAuth.ClientID %>').removeClass('aspNetDisabled');
                        $('#<%=lnkClaimAuth.ClientID %>').removeClass('btn btn-primary btnSmallSize disableCtr');
                        $('#<%=lnkClaimAuth.ClientID %>').addClass('btn btn-primary btnSmallSize');
                    }

                    if (userSelected != "" && userDateSelected != "") {

                        $('#<%= txtClaimAuth.ClientID %>').attr("disabled", "disabled");
                        $('#<%= txtClaimAuthDate.ClientID %>').attr("disabled", "disabled");
                        $('#<%= chkClaimAuth.ClientID %>').attr("disabled", "disabled");
                        $('#<%= txtAmountApproved.ClientID %>').attr("disabled", "disabled");

                        $('#<%=lnkClaimAuth.ClientID %>').removeClass('aspNetDisabled');
                        $('#<%=lnkClaimAuth.ClientID %>').addClass('btn btn-primary btnSmallSize disableCtr');

                    }
                }
                else {
                    $('#<%= txtClaimAuth.ClientID %>').attr("disabled", "disabled");
                    $('#<%= txtClaimAuthDate.ClientID %>').attr("disabled", "disabled");
                    $('#<%= chkClaimAuth.ClientID %>').attr("disabled", "disabled");
                    $('#<%= txtAmountApproved.ClientID %>').attr("disabled", "disabled");

                    $('#<%=lnkClaimAuth.ClientID %>').removeClass('aspNetDisabled');
                    $('#<%=lnkClaimAuth.ClientID %>').addClass('btn btn-primary btnSmallSize disableCtr');
                }
            }

        }        

        function partialCreditSelected() {

            var hdPC = document.getElementById('<%=hdPartialCredits.ClientID%>').value
            if (hdPC == "1") {
                $('#<%= txtParts.ClientID %>').attr("disabled", "disabled");
                $('#<%= txtTotValue.ClientID %>').attr("disabled", "disabled");
                $('#<%= pnConsequentalDamage.ClientID %>').attr("disabled", "disabled");

               <%-- $('#<%= txtActualStatus.ClientID %>').attr("disabled", "disabled");
                $('#<%= txtActualStatus.ClientID %>').attr("disabled", "disabled");
                $('#<%= txtActualStatus.ClientID %>').attr("disabled", "disabled");
                $('#<%= txtActualStatus.ClientID %>').attr("disabled", "disabled");
                $('#<%= txtActualStatus.ClientID %>').attr("disabled", "disabled");
                $('#<%= txtActualStatus.ClientID %>').attr("disabled", "disabled");--%>

            }
        }

        function setClassFA() {

            var hd1 = document.getElementById('<%=hdTriggeredControl.ClientID%>').value;
            var hd2 = document.getElementById('<%=hdLaunchControl.ClientID%>').value;

                var iAccess = $("#div" + hd1);
                var iContainer = $("#" + hd2);                

                var iValue = iContainer.children(0).children(0)     
                //var iClass = iValue.attr('class');
            var iClass = document.getElementById('<%=hdSelectedClass.ClientID%>').value;
            var iCurrentClass = iValue.attr('class');

            if (iClass == "fa fa-plus") {

                //var ok1 = iAccess.attr('class');
                //var iClass1 = iValue.attr('class');

                if (iAccess.attr('class') != "divCustomClassOk") {
                    iAccess.toggleClass('divCustomClass divCustomClassOk');
                }

                if (iClass != "fa fa-minus" && iCurrentClass == iClass) {
                    iValue.toggleClass('fa-plus fa-minus');
                }

                iAccess.closest('td').removeClass('padding0');

                //iAccess.removeClass('divCustomClass');
                //iAccess.addClass('divCustomClassOk');

                //iValue.addClass('fa').removeClass('fa');
                //iValue.addClass('fa-minus').removeClass('fa-plus');
                //iValue.toggleClass('fa-plus fa-minus');//.removeClass('fa fa-plus');

                //$('#MainContent_loadFileSection').closest('.container').removeClass('hideProp')
            }
            else {

                //var ok2 = iAccess.attr('class');
                //var iClass = iValue.attr('class');

                if (iAccess.attr('class') != "divCustomClass") {
                    iAccess.toggleClass('divCustomClassOk divCustomClass');
                }

                if (iClass != "fa fa-plus" && iCurrentClass == iClass) {
                    iValue.toggleClass('fa-minus fa-plus');
                }

                iAccess.closest('td').addClass('padding0');

                //iAccess.removeClass('divCustomClassOk');
                //iAccess.addClass('divCustomClass');

                //iValue.addClass('fa').removeClass('fa');
                //iValue.addClass('fa-plus').removeClass('fa-minus');
                //iValue.toggleClass('fa-minus fa-plus');//.removeClass('fa fa-minus');
            }

        }

        function setTabsClaimNo() {
           // debugger

            var hdClaimNo = document.getElementById('<%=hdClaimNumber.ClientID%>').value
            
            if (hdClaimNo != "") {
                $('#MainContent_claimQuickOverview').closest('.container').removeClass('hideProp');
                $('#<%=lblClaimQuickOverview.ClientID %>').text(hdClaimNo);
            }
            else {
                $('#MainContent_claimQuickOverview').closest('.container').addClass('hideProp');
                $('#<%=lblClaimQuickOverview.ClientID %>').text("");
            }
        }

        function fixesSmallBtnClass() {
            debugger

            $('#<%= txtActualStatus.ClientID %>').attr("disabled", "disabled");


            if ($('#<%=chkInitialReview.ClientID %>').is(':checked')) { 

                var txtInitRev = document.getElementById('<%=txtInitialReview.ClientID%>').value;
                var txtInitRevDate = document.getElementById('<%=txtInitialReviewDate.ClientID%>').value;

                if (txtInitRev != "" && txtInitRevDate != "") {

                    $('#<%=chkInitialReview.ClientID %>').addClass('disableCtr');
                    $('#<%=chkInitialReview.ClientID %>').attr('disabled', true);

                    $('#<%=lnkInitialReview.ClientID %>').removeClass('aspNetDisabled');
                    $('#<%=lnkInitialReview.ClientID %>').addClass('btn btn-primary btnSmallSize disableCtr');

                    $('#<%=txtInitialReview.ClientID %>').attr("disabled", "disabled")
                    $('#<%=txtInitialReviewDate.ClientID %>').attr("disabled", "disabled")

                }
            }

            if ($('#<%=chkAcknowledgeEmail.ClientID %>').is(':checked')) {
                //debugger

                if (document.getElementById('<%=txtAcknowledgeEmail.ClientID%>').value != "") {
                    $('#<%=chkAcknowledgeEmail.ClientID %>').addClass('disableCtr');
                    $('#<%=chkAcknowledgeEmail.ClientID %>').attr('disabled', true);

                    $('#<%=lnkAcknowledgeEmail.ClientID %>').removeClass('aspNetDisabled');
                    $('#<%=lnkAcknowledgeEmail.ClientID %>').addClass('btn btn-primary btnSmallSize disableCtr');

                    $('#<%=txtAcknowledgeEmail.ClientID %>').attr("disabled", "disabled")
                    $('#<%=txtAcknowledgeEmailDate.ClientID %>').attr("disabled", "disabled")
                }
                else {
                    $('#<%=chkAcknowledgeEmail.ClientID %>').addClass('disableCtr');
                    $('#<%=chkAcknowledgeEmail.ClientID %>').attr('disabled', true); 

                    $('#<%=txtAcknowledgeEmail.ClientID %>').attr("disabled", "disabled")
                    $('#<%=txtAcknowledgeEmailDate.ClientID %>').attr("disabled", "disabled")
                }                

                <%--var hdHasText = document.getElementById('<%=txtAcknowledgeEmail.ClientID%>').value;
                if (hdHasText != "") {
                    $('#MainContent_rwAckEmailMsg').removeClass('form-row paddingVert');
                    $('#MainContent_rwAckEmailMsg').addClass('form-row paddingVert hideProp');
                }
                else {
                    $('#MainContent_rwAckEmailMsg').closest('.form-row').removeClass('hideProp')
                } --%>               
            }            

            if ($('#<%=chkInfoCust.ClientID %>').is(':checked')) { 

                if (document.getElementById('<%=txtInfoCust.ClientID%>').value != "") {
                    $('#<%=chkInfoCust.ClientID %>').addClass('disableCtr');
                    $('#<%=chkInfoCust.ClientID %>').attr('disabled', true); 

                    $('#<%=lnkInfoCust.ClientID %>').removeClass('aspNetDisabled');
                    $('#<%=lnkInfoCust.ClientID %>').addClass('btn btn-primary btnSmallSize disableCtr');

                    $('#<%=txtInfoCust.ClientID %>').attr("disabled", "disabled")
                    $('#<%=txtInfoCustDate.ClientID %>').attr("disabled", "disabled")
                }
                else {
                    $('#<%=chkInfoCust.ClientID %>').addClass('disableCtr');
                    $('#<%=chkInfoCust.ClientID %>').attr('disabled', true); 

                    $('#<%=txtInfoCust.ClientID %>').attr("disabled", "disabled")
                    $('#<%=txtInfoCustDate.ClientID %>').attr("disabled", "disabled")
                }
            }

            if ($('#<%=chkPartRequested.ClientID %>').is(':checked')) {

                var txtPartReq = document.getElementById('<%=txtPartRequested.ClientID%>').value;
                var txtPartReqDate = document.getElementById('<%=txtPartRequestedDate.ClientID%>').value;

                if (txtPartReq != "" && txtPartReqDate != "") {

                    $('#<%=chkPartRequested.ClientID %>').addClass('disableCtr');
                    $('#<%=chkPartRequested.ClientID %>').attr('disabled', true);

                    $('#<%=lnkPartRequested.ClientID %>').removeClass('aspNetDisabled');
                    $('#<%=lnkPartRequested.ClientID %>').addClass('btn btn-primary btnSmallSize disableCtr');

                    $('#<%=txtPartRequested.ClientID %>').attr("disabled", "disabled")
                    $('#<%=txtPartRequestedDate.ClientID %>').attr("disabled", "disabled")

                }
                else {
                    $('#<%=chkPartRequested.ClientID %>').prop('checked', false);
                    $('#<%=chkPartRequested.ClientID %>').attr('checked', false);
                }
            }

            if ($('#<%=chkPartReceived.ClientID %>').is(':checked')) {

                var txtPartRec = document.getElementById('<%=txtPartReceived.ClientID%>').value;
                var txtPartRecDate = document.getElementById('<%=txtPartReceivedDate.ClientID%>').value;

                if (txtPartRec != "" && txtPartRecDate != "") {

                    $('#<%=chkPartReceived.ClientID %>').addClass('disableCtr');
                    $('#<%=chkPartReceived.ClientID %>').attr('disabled', true);

                    $('#<%=lnkPartReceived.ClientID %>').removeClass('aspNetDisabled');
                    $('#<%=lnkPartReceived.ClientID %>').addClass('btn btn-primary btnSmallSize disableCtr');

                    $('#<%=txtPartReceived.ClientID %>').attr("disabled", "disabled")
                    $('#<%=txtPartReceivedDate.ClientID %>').attr("disabled", "disabled")

                }
                else {
                    $('#<%=chkPartReceived.ClientID %>').prop('checked', false);
                    $('#<%=chkPartReceived.ClientID %>').attr('checked', false);
                }
            }

            if ($('#<%=chkTechReview.ClientID %>').is(':checked')) {

                var txtTechRev = document.getElementById('<%=txtTechReview.ClientID%>').value;
                var txtTechRevDate = document.getElementById('<%=txtTechReviewDate.ClientID%>').value;

                if (txtTechRev != "" && txtTechRevDate != "") {

                    $('#<%=chkTechReview.ClientID %>').addClass('disableCtr');
                    $('#<%=chkTechReview.ClientID %>').attr('disabled', true);

                    $('#<%=lnkTechReview.ClientID %>').removeClass('aspNetDisabled');
                    $('#<%=lnkTechReview.ClientID %>').addClass('btn btn-primary btnSmallSize disableCtr');

                    $('#<%=txtTechReview.ClientID %>').attr("disabled", "disabled")
                    $('#<%=txtTechReviewDate.ClientID %>').attr("disabled", "disabled")

                }
                else {
                    $('#<%=chkTechReview.ClientID %>').prop('checked', false);
                    $('#<%=chkTechReview.ClientID %>').attr('checked', false);
                }
            }

            if ($('#<%=chkWaitSupReview.ClientID %>').is(':checked')) {

                var txtWaitSup = document.getElementById('<%=txtWaitSupReview.ClientID%>').value;
                var txtWaitSupDate = document.getElementById('<%=txtWaitSupReviewDate.ClientID%>').value;

                if (txtWaitSup != "" && txtWaitSupDate != "") {

                    $('#<%=chkWaitSupReview.ClientID %>').addClass('disableCtr');
                    $('#<%=chkWaitSupReview.ClientID %>').attr('disabled', true);

                    $('#<%=lnkWaitSupReview.ClientID %>').removeClass('aspNetDisabled');
                    $('#<%=lnkWaitSupReview.ClientID %>').addClass('btn btn-primary btnSmallSize disableCtr');

                    $('#<%=txtWaitSupReview.ClientID %>').attr("disabled", "disabled")
                    $('#<%=txtWaitSupReviewDate.ClientID %>').attr("disabled", "disabled")

                }
                else {
                    $('#<%=chkWaitSupReview.ClientID %>').prop('checked', false);
                    $('#<%=chkWaitSupReview.ClientID %>').attr('checked', false);
                }
            }

            if ($('#<%=chkApproved.ClientID %>').is(':checked')) {
                //debugger

                var hdHasText = document.getElementById('<%=txtClaimCompleted.ClientID%>').value;

                if (hdHasText != "") {

                    //$('#<%=chkWaitSupReview.ClientID %>').addClass('disableCtr');
                    //$('#<%=lnkWaitSupReview.ClientID %>').removeClass('aspNetDisabled');
                    //$('#<%=lnkWaitSupReview.ClientID %>').addClass('btn btn-primary btnSmallSize disableCtr');

                    $('#<%=txtClaimCompleted.ClientID %>').attr("disabled", "disabled")
                    $('#<%=txtClaimCompletedDate.ClientID %>').attr("disabled", "disabled")
                    $('#<%=chkApproved.ClientID %>').addClass('disableCtr');
                    $('#<%=chkApproved.ClientID %>').attr("disabled", "disabled")
                    $('#<%=chkDeclined.ClientID %>').addClass('disableCtr');
                    $('#<%=chkDeclined.ClientID %>').attr("disabled", "disabled")

                }                
                
            }

            if ($('#<%=chkDeclined.ClientID %>').is(':checked')) {
                //debugger

                var hdHasText = document.getElementById('<%=txtClaimCompleted.ClientID%>').value;

                if (hdHasText != "") {

                    //$('#<%=chkWaitSupReview.ClientID %>').addClass('disableCtr');
                    //$('#<%=lnkWaitSupReview.ClientID %>').removeClass('aspNetDisabled');
                    //$('#<%=lnkWaitSupReview.ClientID %>').addClass('btn btn-primary btnSmallSize disableCtr');

                    $('#<%=txtClaimCompleted.ClientID %>').attr("disabled", "disabled")
                    $('#<%=txtClaimCompletedDate.ClientID %>').attr("disabled", "disabled")
                    $('#<%=chkApproved.ClientID %>').addClass('disableCtr');
                    $('#<%=chkApproved.ClientID %>').attr("disabled", "disabled")
                    $('#<%=chkDeclined.ClientID %>').addClass('disableCtr');
                    $('#<%=chkDeclined.ClientID %>').attr("disabled", "disabled")

                }

            }

        }

        function rangePicker1() {
            var dateFormat = "mm/dd/yy",
                from = $("#<%= txtDateInit.ClientID %>")
                    .datepicker({
                        defaultDate: "+1w",
                        changeMonth: true,
                        dateFormat: 'mm/dd/yy',
                        autoClose: true,
                        numberOfMonths: 1
                    })
                    .on("change", function () {
                        to.datepicker("option", "minDate", getDate(this));
                    }),
                to = $("#<%= txtDateTo.ClientID %>")
                    .datepicker({
                        defaultDate: "+1w",
                        changeMonth: true,
                        dateFormat: 'mm/dd/yy',
                        autoClose: true,
                        numberOfMonths: 1
                    })
                    .on("change", function () {
                        from.datepicker("option", "maxDate", getDate(this));
                    });

            function getDate(element) {
                var date;
                try {
                    date = $.datepicker.parseDate(dateFormat, element.value);
                } catch (error) {
                    date = null;
                }

                return date;
            }
        }

        function rangePicker2() {
            var dateFormat = "mm/dd/yy",
                from = $("#<%= txtAddCommDateInit.ClientID %>")
                    .datepicker({
                        defaultDate: "+1w",
                        changeMonth: true,
                        dateFormat: 'mm/dd/yy',
                        autoClose: true,
                        numberOfMonths: 1
                    })
                    .on("change", function () {
                        to.datepicker("option", "minDate", getDate(this));
                    }),
                to = $("#<%= txtAddCommDateTo.ClientID %>").datepicker({
                    defaultDate: "+1w",
                    changeMonth: true,
                    dateFormat: 'mm/dd/yy',
                    autoClose: true,
                    numberOfMonths: 1
                })
                    .on("change", function () {
                        from.datepicker("option", "maxDate", getDate(this));
                    });

            function getDate(element) {
                var date;
                try {
                    date = $.datepicker.parseDate(dateFormat, element.value);
                } catch (error) {
                    date = null;
                }

                return date;
            }
        }

        function rangePicker3() {
            var dateFormat = "mm/dd/yy",
                from = $("#<%= txtAddVndCommDateInit.ClientID %>")
                    .datepicker({
                        defaultDate: "+1w",
                        changeMonth: true,
                        dateFormat: 'mm/dd/yy',
                        autoClose: true,
                        numberOfMonths: 1
                    })
                    .on("change", function () {
                        to.datepicker("option", "minDate", getDate(this));
                    }),
                to = $("#<%= txtAddVndCommDateTo.ClientID %>").datepicker({
                    defaultDate: "+1w",
                    changeMonth: true,
                    dateFormat: 'mm/dd/yy',
                    autoClose: true,
                    numberOfMonths: 1
                })
                    .on("change", function () {
                        from.datepicker("option", "maxDate", getDate(this));
                    });

            function getDate(element) {
                var date;
                try {
                    date = $.datepicker.parseDate(dateFormat, element.value);
                } catch (error) {
                    date = null;
                }

                return date;
            }
        }   

        function isEmpty(value) {
            return (value == null || value.length === 0);
        }

        $(document).on('keyup keypress', 'form input[type="text"]', function (e) {
            //debugger

            var qq = e.target.id;
            var hsVl = $("#" + qq).val();            
            
            var key = e.KeyCode || e.which;
            if (key == 13) {
                //if (isEmpty(hsVl)) {
                   // e.preventDefault();
                   // return false;
                //} else {
                    e.preventDefault();
                    $("#<%=btnSearchFilter.ClientID%>").click();
                //}
                
            } 
        });

        <%--$("#<%=txtClaimNo.ClientID%>").focus(function (e) {
            debugger
            
            var key = e.KeyCode || e.which;
            if (key == 13) {
                e.preventDefault();
                $("#<%=btnSearchFilter.ClientID%>").click();
            }
        });--%>

        <%--$("#<%=txtClaimNo.ClientID%>").keypress(function (e) {
            //debugger
            
            var key = e.KeyCode || e.which;
            if (key == 13) {
                e.preventDefault();
                $("#<%=btnSearchFilter.ClientID%>").click();
            }
        });--%>

        <%--        $("#<%=btnSearchFilter.ClientID%>")).focus();
            }
        })--%>;       
                
                    
        

    </script>

</asp:Content>


