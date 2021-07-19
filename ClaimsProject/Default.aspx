<%@ Page Title="Claims Page" Language="vb" AutoEventWireup="true" MasterPageFile="~/Site.Master" CodeBehind="Default.aspx.vb" Inherits="ClaimsProject._Default" ViewStateMode="Disabled" %>
<%@ Register Assembly="AjaxControlToolkit" Namespace="AjaxControlToolkit" TagPrefix="Atk" %>

<asp:Content ID="BodyContent" ContentPlaceHolderID="MainContent" runat="server">

    <script type="text/javascript">        

        

    </script>

    <asp:UpdatePanel ID="updatepnl" runat="server">
        <Triggers>
            <asp:AsyncPostBackTrigger ControlID="hdPartNoSelected" />   
            <asp:AsyncPostBackTrigger ControlID="hdClaimNoSelected" />   
            <asp:AsyncPostBackTrigger ControlID ="ddlSearchReason" />
            <asp:AsyncPostBackTrigger ControlID ="ddlSearchDiagnose" />
            <asp:AsyncPostBackTrigger ControlID ="ddlDiagnoseData"  />
            <asp:AsyncPostBackTrigger ControlID ="ddlLocation"  />
            <asp:AsyncPostBackTrigger ControlID ="ddlSearchExtStatus" /> 
            <asp:AsyncPostBackTrigger ControlID = "chkConsDamage" />
            <asp:PostBackTrigger ControlID="btnSaveFile" />
        </Triggers>

        <ContentTemplate>

            <div class="container-fluid">
                <div class="breadcrumb-area breadcrumb-bg">
                    <div class="row">
                        <div class="col-md-offset-4 col-md-9 center">
                            <div class="breadcrumb-inner">
                                <div class="row">
                                    <div class="col-md-11">
                                        <div class="bread-crumb-inner">
                                            <div class="breadcrumb-area page-list">
                                                <div class="row">
                                                    <div class="col-md-4"></div>
                                                    <div class="col-md-7 link">
                                                        <i class="fa fa-map-marker"></i>
                                                        <a href="/Default">Home</a>
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
                                <div class="col-md-4">
                                    <asp:LinkButton ID="btnGetTemplate" class="boxed-btn-layout btn-rounded" runat="server">
                                                            <i class="fa fa-plus fa-1x"" aria-hidden="true"> </i> Get Template
                                    </asp:LinkButton>
                                </div>
                                <div class="col-md-4">
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
                        <div id="rowPageSize" class="row">
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
                                <asp:Button ID="btnExcel" class="btn btn-primary btn-lg float-right btnFullSize" runat="server" Text="Excel" />
                            </div>
                            <div class="col-xs-12 col-sm-2 flex-item-2 padd-fixed">
                                <asp:Button ID="btnPdf" class="btn btn-primary btn-lg btnFullSize" runat="server" Text="Pdf" />
                            </div>
                            <div class="col-xs-12 col-sm-2 flex-item-3 padd-fixed">
                                <asp:Button ID="btnCopy" class="btn btn-primary btn-lg btnFullSize" runat="server" Text="Copy" />
                            </div>
                            <div class="col-xs-12 col-sm-3"></div>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div id="rowBtnSearch" class="row">
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

            <div id="AddFilesSection" class="container hideProp" runat="server">
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
            </div>            

            <div id="searchFilters" class="container-fluid">
                <div id="rowFilters" class="row">

                    <div class="col-md-2"></div>
                    <div class="col-md-8">
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
                                                                <div class="input-group-append">
                                                                    <asp:TextBox ID="txtClaimNo" name="txt-claimNo" placeholder="Claim Number" class="form-control autosuggestclaim" runat="server"></asp:TextBox>
                                                                    <span class="input-group-addon"><i class="fa fa-hashtag center-vert font-awesome-custom"></i></span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-6">
                                                        <!--search by Part Number-->
                                                        <div id="rowPartNo" class="rowPartNo">                                                            
                                                            <div class="col-md-12" style="margin: 0 auto;">                                                            
                                                                <div class="input-group-append">
                                                                    <asp:TextBox ID="txtPartNo" name="txt-partNo" placeholder="Part Number"  class="form-control autosuggestpart" runat="server"></asp:TextBox>
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
                                                               <div class="input-group-append">
                                                                    <asp:DropDownList ID="ddlSearchExtStatus" name="sel-vndassigned" placeholder="External Status" class="form-control" OnSelectedIndexChanged="ddlSearchExtStatus_SelectedIndexChanged" title="Search by Ext Status." EnableViewState="true" runat="server"></asp:DropDownList>
                                                                   <span class="input-group-addon"><i class="fa fa-sign-out-alt center-vert font-awesome-custom"></i></span>
                                                                </div>
                                                            
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-6">
                                                        <!--search by IntStatus-->
                                                        <div id="rowIntStatus">                                                            
                                                            <div class="col-md-12" style="margin: 0 auto;">
                                                                <div class="input-group-append">
                                                                    <asp:DropDownList ID="ddlSearchIntStatus" name="sel-vndassigned" placeholder="Internal Status" class="form-control" OnSelectedIndexChanged="ddlSearchIntStatus_SelectedIndexChanged" title="Search by int Status." EnableViewState="true" runat="server"></asp:DropDownList>
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
                                                                <div class="input-group-append">
                                                                    <asp:TextBox ID="txtCustomer" name="txt-Customer" placeholder="Customer No." class="form-control autosuggestcustomer" runat="server"></asp:TextBox>
                                                                    <span class="input-group-addon"><i class="fa fa-user-tie center-vert font-awesome-custom"></i></span>
                                                                </div>
                                                            
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-6">
                                                        <!--search by User-->
                                                        <div id="rowUser">                                                            
                                                            <div class="col-md-12" style="margin: 0 auto;">
                                                                <div class="input-group-append">
                                                                    <asp:DropDownList ID="ddlSearchUser" name="sel-vndassigned" placeholder="User Id" class="form-control" OnSelectedIndexChanged="ddlSearchUser_SelectedIndexChanged" title="Search by User." EnableViewState="true" runat="server"></asp:DropDownList>
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
                                                    <div class="col-md-6">
                                                        <!--search by reason-->
                                                        <div id="rowReason">                                                            
                                                            <div class="col-md-12" style="margin: 0 auto;">
                                                                <div class="input-group-append">
                                                                    <asp:DropDownList ID="ddlSearchReason" name="sel-vndassigned" placeholder="Reason" class="form-control" OnSelectedIndexChanged="ddlSearchReason_SelectedIndexChanged" title="Search by Claim Reason." EnableViewState="true" runat="server"></asp:DropDownList>
                                                                    <span class="input-group-addon"><i class="fa fa-sliders-h center-vert font-awesome-custom"></i></span>
                                                                </div>
                                                            
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-6">
                                                        <!--search by Diagnose-->
                                                        <div id="rowDiagnose">                                                            
                                                            <div class="col-md-12" style="margin: 0 auto;">
                                                                <div class="input-group-append">
                                                                    <asp:DropDownList ID="ddlSearchDiagnose" name="sel-vndassigned" placeholder="Diagnose" class="form-control" OnSelectedIndexChanged="ddlSearchDiagnose_SelectedIndexChanged" title="Search by Claim Diagnose." EnableViewState="true" runat="server"></asp:DropDownList>
                                                                    <span class="input-group-addon"><i class="fa fa-briefcase center-vert font-awesome-custom"></i></span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div id="SixRow">
                                        <div class="row">
                                            <div class="col-md-12">
                                                <div class="form-row">
                                                    <div class="col-md-6">
                                                        <!--btn search-->
                                                        <asp:Button ID="btnSearchFilter" Text="Search by Criteria" OnClick="btnSearchFilter_Click" CssClass="btn btn-primary rightCls" runat="server" />
                                                    </div>
                                                    <div class="col-md-6">
                                                        <!--btn clear fields-->
                                                        <asp:Button ID="btnClearFilter" Text="   Clear Filters   " CssClass="btn btn-primary" runat="server" />
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
                            <div class="col-md-3"></div>
                        </div>
                    </div>
                    <div class="col-md-2"></div>

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

                    <asp:HiddenField ID="selectedFilter" Value=""  runat="server" />

                    <table id="ndtt" runat="server"></table>
                    <asp:Label ID="lblGrvGroup" Text="test" runat="server"></asp:Label>

                    <asp:HiddenField ID="hdGridViewContent" Value="1"  runat="server" />
                    <asp:HiddenField ID="hdNavTabsContent" Value="0"  runat="server" />

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
                    <asp:HiddenField ID="hdlastComment" Value="" runat="server" />
                    <asp:HiddenField ID="chkinitial" Value="" runat="server" />
                    <asp:HiddenField ID="hdWkStatOne" Value="" runat="server" />
                    <asp:HiddenField ID="hdWkStatTwo" Value="" runat="server" />

                    <asp:HiddenField ID="hdSelectedDiagnose" Value="0" runat="server" />
                    <asp:HiddenField ID="hdLocationSelected" Value="0" runat="server" />

                    <asp:HiddenField ID="hdVendorClaimNo" Value="" runat="server" />
                    <asp:HiddenField ID="hdDisplaySeeVndClaim" Value="0" runat="server" /> <!-- To execute the grid events after postback see panels --> 
                    <asp:HiddenField ID="hdDisplayAddVndClaim" Value="0" runat="server" />  <!-- To execute the grid events after postback add panels -->    

                    <asp:HiddenField ID="hdSeeVndComments" Value="0" runat="server" /> <!-- handle the See vendor claim panel div -->
                    <asp:HiddenField ID="hdSeeComments" Value="0" runat="server" /> <!-- handle the See panel div -->
                    <asp:HiddenField ID="hdAddVndComments" Value="0" runat="server" />  <!-- handle the Add vendor claim panel div -->
                    <asp:HiddenField ID="hdAddComments" Value="0" runat="server" />   <!-- handle the Add panel div -->
                    

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
                                        CssClass="table table-striped table-bordered" AllowPaging="True" DataKeyNames="MHMRNR" GridLines="None" 
                                        OnPageIndexChanging="grvClaimReport_PageIndexChanging" OnRowDataBound="grvClaimReport_RowDataBound" OnRowCommand="grvClaimReport_RowCommand"
                                        OnRowUpdating="grvClaimReport_RowUpdating" >
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

                                            <asp:BoundField DataField="MHMRNR" HeaderText="CLAIM NUMBER" ItemStyle-Width="10%" />
                                            <asp:TemplateField HeaderText="DATE ENTERED" ItemStyle-Width="10%" SortExpression="DATE">
                                                <ItemTemplate>
                                                    <asp:Literal ID="Literal1" runat="server"
                                                        Text='<%#String.Format("{0:MM/dd/yyyy}", System.Convert.ToDateTime(Eval("MHDATE"))) %>'>        
                                                    </asp:Literal>
                                                </ItemTemplate>
                                            </asp:TemplateField> 
                                            <%--<asp:BoundField DataField="MHTDES" HeaderText="TYPE" ItemStyle-Width="11%" />  removido --%>
                                            <asp:BoundField DataField="mhcunr" HeaderText="CUSTOMER" ItemStyle-Width="10%" />
                                            <asp:BoundField DataField="mhcuna" HeaderText="CUSTOMER NAME" ItemStyle-Width="15%" />
                                            <asp:BoundField DataField="mhtomr" HeaderText="CREDIT AMOUNT" ItemStyle-Width="6%" />                                            
                                            <asp:BoundField DataField="mhptnr" HeaderText="PART NUMBER" ItemStyle-Width="6%" />
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
                                                    <asp:Label ID="Label12" runat="server" Text='<%# Eval("mhstde").ToString() %>'></asp:Label>
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
                            <a class="nav-link active" data-toggle="tab" href="#claimoverview" role="tab" aria-selected="false">claim overview</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" data-toggle="tab" href="#partinfo" role="tab" aria-selected="false">defective part information</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" data-toggle="tab" href="#claimstatus" role="tab" aria-selected="false">status</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" data-toggle="tab" href="#claim-comments" role="tab" aria-selected="false">claim comments</a>
                        </li>
                    </ul>

                    <!-- Tab panes -->
                    <div id="tabc" class="tab-content">
                        <div class="tab-pane active" id="claimoverview">
                            <div class="col-md-12">
                                <h3><asp:Label ID="lblFirstTabDesc" Text="CLAIM NO. " runat="server"></asp:Label></h3>

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
                                                    <asp:TextBox ID="txtInstDate" CssClass="form-control" runat="server"></asp:TextBox>
                                                </div>
                                                <div class="col-md-6">
                                                    <asp:Label ID="lblHWorked" Text="Hours Worked" CssClass="control-label" runat="server"></asp:Label>
                                                    <asp:TextBox ID="txtHWorked" CssClass="form-control" runat="server"></asp:TextBox>
                                                </div>
                                            </div>                                            

                                            <div class="form-row last">
                                                <div class="col-md-12">
                                                    <asp:Label ID="lblCustStatement" Text="Customer's Statement" CssClass="control-label" runat="server"></asp:Label>
                                                    <asp:TextBox ID="txtCustStatement" CssClass="form-control" TextMode="MultiLine" runat="server"></asp:TextBox>
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
                                                    <asp:TextBox ID="txtContactName" CssClass="form-control" runat="server"></asp:TextBox>
                                                </div>                                                
                                            </div>

                                            <div class="form-row">
                                                <div class="col-md-12">
                                                    <asp:Label ID="lblContactPhone" Text="Contact Phone" CssClass="control-label" runat="server"></asp:Label>
                                                    <asp:TextBox ID="txtContactPhone" CssClass="form-control" runat="server"></asp:TextBox>
                                                </div>
                                            </div>

                                            <div class="form-row last">
                                                <div class="col-md-12">
                                                    <asp:Label ID="lblContactEmail" Text="Contact Email" CssClass="control-label" runat="server"></asp:Label>
                                                    <asp:TextBox ID="txtContactEmail" CssClass="form-control" runat="server"></asp:TextBox>
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
                                <h3><asp:Label ID="lblSecondTabDesc" Text="CLAIM NO. " runat="server"></asp:Label></h3>
                                <div class="row">
                                    <div class="col-md-6">
                                        <asp:Panel ID="pnClaimsDept" GroupingText="Claims Department" runat="server">

                                            <div class="form-row">
                                                <div class="col-md-12">
                                                    <asp:Label ID="lblQuarantine" Text="Quarantine Required?" CssClass="control-label" runat="server"></asp:Label>
                                                    <asp:CheckBox ID="chkQuarantine" runat="server" />
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
                                                    <asp:Label ID="lblInvoiceNo1" Text="Invoice No." CssClass="control-label" runat="server"></asp:Label>
                                                    <asp:TextBox ID="txtInvoiceNo1" CssClass="form-control" runat="server"></asp:TextBox>
                                                </div>
                                                <div class="col-md-6">
                                                    <asp:Label ID="lblInvoiceDate1" Text="Invoice Date" CssClass="control-label" runat="server"></asp:Label>
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

                                        <asp:Panel ID="pnPartImage" GroupingText="Part Images" runat="server">

                                            <div class="form-row last">
                                                <div class="col-md-8">
                                                    <asp:DataList ID="datViewer" CssClass="inheritclass" RepeatColumns="3" CellPadding="5" runat="server">
                                                        <ItemTemplate>                                                                                                                       
                                                            <a id="alink" href='<%# Container.DataItem %>' rel="lightbox[roadtrip1]" runat="server">
                                                                <asp:Image ID="Img" CssClass="imgStyle" ImageUrl='<%# Container.DataItem %>' alt="pepeep" Width="100" Height="100" runat="server" />
                                                            </a>
                                                        </ItemTemplate>
                                                    </asp:DataList>
                                                    <%--<asp:Image ID="imgPart" runat="server"/>--%>
                                                </div>
                                                <div class="col-md-4">
                                                    <asp:TextBox ID="txtPartDesc" Text="" TextMode="MultiLine" Enabled="false" runat="server"></asp:TextBox>
                                                </div>
                                            </div>

                                        </asp:Panel>
                                    </div>
                                    <div class="col-md-6">
                                        <asp:Panel ID="pnSalesDept" GroupingText="Sales Department" runat="server">

                                            <div class="form-row">
                                                <div class="col-md-12">
                                                    <asp:Label ID="lblClaimAuth" Text="Claim Authorization if over $500" CssClass="control-label" runat="server"></asp:Label>
                                                    <asp:CheckBox ID="chkClaimAuth" runat="server" />
                                                    <div class="form-row">                                                       
                                                        <div class="col-md-6">
                                                            <asp:TextBox ID="txtClaimAuth" CssClass="form-control" runat="server" />                                                            
                                                        </div>
                                                        <div class="col-md-6">
                                                            <asp:TextBox ID="txtClaimAuthDate" CssClass="form-control" runat="server" />  
                                                        </div>
                                                    </div>                                                    
                                                </div>                                                
                                            </div>

                                            <div class="form-row last">
                                                <div class="col-md-12">
                                                    <asp:Label ID="lblAmountApproved" Text="Claim amount approved by sales on top of Claims Approval" CssClass="control-label" runat="server"></asp:Label>
                                                    <asp:TextBox ID="txtAmountApproved" CssClass="form-control" runat="server"></asp:TextBox>
                                                </div>
                                            </div>

                                        </asp:Panel>

                                        <br />

                                        <asp:Panel ID="pnRestock" GroupingText="Re-Stock Actions" runat="server">

                                            <div class="form-row last">
                                                <div class="col-md-6">
                                                    <asp:Button ID="btnRestock" Text="Re-Stock Part" CssClass="btn btn-primary" runat="server" />
                                                </div>
                                                <div class="col-md-6">
                                                    <asp:Button ID="btnUndoRestock" Text="Undo Re-Stock" CssClass="btn btn-primary" runat="server" />
                                                </div>
                                            </div>

                                        </asp:Panel>
                                    </div>
                                </div>                                
                            </div>                            
                        </div>
                        <div class="tab-pane" id="claimstatus">
                            <div class="col-md-12">
                                <h3><asp:Label ID="lblThirdTabDesc" Text="WARNING NO. " runat="server"></asp:Label></h3>
                                <div class="row">
                                    <div class="col-md-6">
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
                                                    <asp:CheckBox ID="chkAcknowledgeEmail" runat="server" />
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

                                            <div class="form-row">
                                                <div class="col-md-12">
                                                    <asp:Label ID="lblInfoCust" Text="Info Requested to Customer" CssClass="control-label" runat="server"></asp:Label>
                                                    <asp:CheckBox ID="chkInfoCust" runat="server" />
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

                                            <div class="form-row">
                                                <div class="col-md-12">
                                                    <asp:Label ID="lblPartRequested" Text="Part Requested" CssClass="control-label" runat="server"></asp:Label>
                                                    <asp:CheckBox ID="chkPartRequested" runat="server" />
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
                                                    <asp:CheckBox ID="chkClaimCompleted" runat="server" />
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
                                    <div class="col-md-6">
                                        <asp:Panel ID="pnTotals" GroupingText="Totals" runat="server">

                                            <asp:Panel ID="pnSubTotalClaimed" GroupingText="Subtotal Claimed" runat="server">
                                                <div class="form-row last paddingtop8">
                                                    <div class="col-md-12">
                                                        <%--<asp:Label ID="lblSubClaim" Text="Subtotal Claimed" CssClass="control-label undermark" runat="server"></asp:Label>--%>
                                                        <div class="form-row paddingtop8">
                                                            <div class="col-md-2">
                                                                <asp:Label ID="lblParts" CssClass="control-label" Text="Parts" runat="server" />
                                                            </div>
                                                            <div class="col-md-4">
                                                                <asp:TextBox ID="txtParts" CssClass="form-control" runat="server" />
                                                            </div>
                                                            <div class="col-md-2">
                                                                <asp:Label ID="lblFreight" CssClass="control-label" Text="Freight" runat="server" />
                                                            </div>
                                                            <div class="col-md-4">
                                                                <asp:TextBox ID="txtFreight" CssClass="form-control" runat="server" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </asp:Panel>

                                            <br />

                                            <asp:Panel ID="pnConsequentalDamage" GroupingText="Consequental Damage" runat="server">
                                                <div class="form-row paddingtop8">
                                                    <div class="col-md-12">
                                                        <asp:CheckBox ID="chkConsDamage" OnCheckedChanged="chkConsDamage_CheckedChanged" AutoPostBack="true" Enabled="true" runat="server" />
                                                        <asp:Label ID="lblConsDamage" Text="Consequental damage, if any." CssClass="control-label" runat="server"></asp:Label>
                                                        <%--<asp:TextBox ID="txtConsDamage" CssClass="form-control" runat="server"></asp:TextBox>--%>
                                                    </div>
                                                </div>
                                                <div class="form-row paddingtop8">
                                                    <div class="col-md-3">
                                                        <asp:Label ID="lblCDLabor" Text="Labor Cost" CssClass="control-label" runat="server"> </asp:Label>
                                                        <asp:TextBox ID="txtCDLabor" CssClass="form-control" Enabled="false" runat="server"></asp:TextBox>
                                                    </div>
                                                    <div class="col-md-3">
                                                        <asp:Label ID="lblCDPart" Text="Part Cost" CssClass="control-label" runat="server"></asp:Label>
                                                        <asp:TextBox ID="txtCDPart" CssClass="form-control" Enabled="false" runat="server"></asp:TextBox>
                                                    </div>
                                                    <div class="col-md-3">
                                                        <asp:Label ID="lblCDFreight" Text="Freight Cost" CssClass="control-label" runat="server"></asp:Label>
                                                        <asp:TextBox ID="txtCDFreight" CssClass="form-control" Enabled="false" runat="server"></asp:TextBox>
                                                    </div>
                                                    <div class="col-md-3">
                                                        <asp:Label ID="lblCDMisc" Text="Misc Cost" CssClass="control-label" runat="server"></asp:Label>
                                                        <asp:TextBox ID="txtCDMisc" CssClass="form-control" Enabled="false" runat="server"></asp:TextBox>
                                                    </div>
                                                </div> 
                                                <div class="form-row paddingtop8 last">
                                                    <div class="col-md-12">
                                                        <asp:Label ID="Label3" Text="Total Cons. Damage Value" CssClass="control-label" runat="server"></asp:Label>
                                                        <asp:TextBox ID="txtConsDamageTotal" CssClass="form-control" Enabled="false" runat="server"></asp:TextBox>
                                                    </div>
                                                </div>
                                            </asp:Panel>

                                            <br />

                                            <asp:Panel ID="pnSubTotalClaim" GroupingText="Claim" runat="server">
                                                <div class="form-row last">
                                                    <div class="col-md-12">
                                                        <%--<asp:Label ID="lblClaim" Text="Claim" CssClass="control-label undermark" runat="server"></asp:Label>--%>
                                                        <div class="form-row">
                                                            <div class="col-md-3">
                                                            </div>
                                                            <div class="col-md-2">
                                                                <asp:Label ID="lblApproved" CssClass="control-label" Text="Approved" runat="server" />
                                                            </div>
                                                            <div class="col-md-1">
                                                                <asp:CheckBox ID="chkApproved" AutoPostBack="true" runat="server" />
                                                            </div>
                                                            <div class="col-md-2">
                                                                <asp:Label ID="lblDeclined" CssClass="control-label" Text="Declined" runat="server" />
                                                            </div>
                                                            <div class="col-md-1">
                                                                <asp:CheckBox ID="chkDeclined" AutoPostBack="true" runat="server" />
                                                            </div>
                                                            <div class="col-md-3">
                                                            </div>
                                                        </div>
                                                    </div>                                                    
                                                </div>                                                
                                            </asp:Panel> 
                                            <br />
                                            
                                        </asp:Panel>
                                        <asp:Panel ID="pnExternalStatus" GroupingText="External Status" CssClass="hidecol" runat="server">

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
                                <div class="row">
                                    <div class="col-md-12">
                                        <asp:Panel ID="pnActions" GroupingText="Actions" runat="server">
                                            <div class="row">
                                                <div class="col-md-4">
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
                                                <div class="col-md-4">
                                                    <asp:Panel ID="pnSubActionFiles" GroupingText="Files" runat="server">
                                                        <div class="form-row last">
                                                            <div class="col-md-6">
                                                                <asp:Button ID="btnAddFiles" Text="Add Files" CssClass="btn btn-primary btnAdjustSize" runat="server" />
                                                            </div>
                                                            <div class="col-md-6">
                                                                <asp:Button ID="btnSeeFiles" Text="See Files" OnClick="btnSeeFiles_Click" CssClass="btn btn-primary btnAdjustSize" runat="server" />
                                                            </div>
                                                        </div>
                                                    </asp:Panel>
                                                </div>
                                                <div class="col-md-4">
                                                    <asp:Panel ID="pnSubActionFinal" GroupingText="Final Actions" runat="server">
                                                        <div class="form-row last">
                                                            <div class="col-md-6">
                                                                <asp:Button ID="btnPurchasing" Text="Send to Purchasing" CssClass="btn btn-primary btnAdjustSize" runat="server" />
                                                            </div>
                                                            <div class="col-md-6">
                                                                <asp:Button ID="btnCloseClaim" Text="Close Claim" CssClass="btn btn-primary btnAdjustSize" runat="server" />
                                                            </div>
                                                        </div>
                                                    </asp:Panel>
                                                </div>
                                            </div>
                                        </asp:Panel>
                                    </div>
                                </div>
                            </div>                            
                        </div>
                        <div class="tab-pane" id="claim-comments">
                            <!-- Tab Description text -->
                            <div class="row">
                                <div class="col-md-12">
                                    <h3><asp:Label ID="lblFourTabDesc" Text="WARNING NO. " runat="server"></asp:Label></h3>    
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
                                                                    <asp:TextBox ID="txtAddWrnNo" CssClass="form-control fullTextBox" runat="server" />
                                                                </div>
                                                            </div>
                                                            <div class="col-md-6">
                                                                <div class="form-group">
                                                                    <asp:Label ID="lblAddRetNo" CssClass="label-style" Text="Return No." runat="server"></asp:Label>
                                                                    <asp:TextBox ID="txtAddRetNo" CssClass="form-control fullTextBox" runat="server" />
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <!-- row for datefrom and dateto -->
                                                        <div id="rowAddCommInit" class="form-row">                                                            
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
                                                                    <asp:Label ID="lblAddSubject" CssClass="label-style" Text="Subject" runat="server"></asp:Label>
                                                                    <asp:TextBox ID="txtAddSubject" CssClass="form-control fullTextBox" runat="server" />
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <!-- row for int and ext comm -->
                                                        <div class="form-row" style="border-bottom: 2px groove whitesmoke;">
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
                                                        <div class="form-row" style="padding-top: 10px !important;">
                                                            <div class="col-md-12"> 
                                                                <div class="form-group">                                                                    
                                                                    <asp:Label ID="lblMessage" CssClass="label-style" Text="Message" runat="server"></asp:Label>
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

                                                        <div class="form-row">
                                                            <div class="col-md-12">
                                                                <div class="form-group">
                                                                    <asp:ListBox ID="lstComments" EnableViewState=" true" ViewStateMode="Enabled" runat="server"> </asp:ListBox> 
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <!-- row for comment action buttons -->
                                                        <div class="form-row last">
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
                            <div id="rowSeeComments" runat="server">

                                <!-- row see comments section -->
                                <div class="row">
                                    <div id="seeCommentsR" class="container hideProp" runat="server">
                                        <!-- Warning No and Return No values -->
                                        <div class="form-row">
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
                                                                        <asp:BoundField DataField="CWCHCO" HeaderText="CODE" ItemStyle-Width="10%"  />
                                                                        <asp:BoundField DataField="CWCHSU" HeaderText="SUBJECT" ItemStyle-Width="15%" />
                                                                        <asp:BoundField DataField="CWCHDA" HeaderText="DATE ENTERED" ItemStyle-Width="6%" />
                                                                        <asp:BoundField DataField="CWCHTI" HeaderText="TIME ENTERED" ItemStyle-Width="6%" />
                                                                        <asp:BoundField DataField="USUSER" HeaderText="USER" ItemStyle-Width="6%" />
                                                                        <asp:BoundField DataField="CWCFLA" HeaderText="Int / Ext " ItemStyle-Width="6%" />
                                                                        <asp:TemplateField HeaderText="DETAIL" ItemStyle-Width="13%">
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
                                                                                            <asp:GridView ID="grvSeeCommDet" runat="server" AutoGenerateColumns="false" GridLines="None">
                                                                                                <Columns>
                                                                                                    <asp:BoundField DataField="CWCHCO" HeaderText="ID" ItemStyle-Width="5%" ItemStyle-CssClass="hidecol" HeaderStyle-CssClass="hidecol" />
                                                                                                    <asp:BoundField DataField="CWCDTX" HeaderText="COMMENT" ItemStyle-Width="5%" />
                                                                                                </Columns>
                                                                                                <HeaderStyle BackColor="#95B4CA" ForeColor="White" />
                                                                                            </asp:GridView>
                                                                                        </div>
                                                                                    </td>
                                                                                </tr>
                                                                            </ItemTemplate>
                                                                        </asp:TemplateField>
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
                                        <div class="form-row">
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
                                                                        <asp:BoundField DataField="CCCODE" HeaderText="CODE" ItemStyle-Width="10%" />
                                                                        <asp:BoundField DataField="CCSUBJ" HeaderText="SUBJECT" ItemStyle-Width="15%" />
                                                                        <asp:BoundField DataField="CCDATE" HeaderText="DATE ENTERED" ItemStyle-Width="6%" />
                                                                        <asp:BoundField DataField="CCTIME" HeaderText="TIME ENTERED" ItemStyle-Width="6%" />
                                                                        <asp:BoundField DataField="USUSER" HeaderText="USER" ItemStyle-Width="6%" />
                                                                        <asp:TemplateField HeaderText="DETAIL" ItemStyle-Width="13%">
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
                                                                        </asp:TemplateField>
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
                                
                    </div>                            
                </div>

                <!-- General Btns for section -->
                <div id="rowBtn" class="row" runat="server">
                    <div class="col-md-9"> &nbsp;</div>
                    <div class="col-md-1 padding2">
                        <asp:LinkButton ID="btnNew" class="boxed-btn-layout btn-sm btn-rounded" ToolTip="New" runat="server">
                            <i class="fa fa-file fa-2x"" aria-hidden="true"> </i> 
                        </asp:LinkButton>
                        <%--<asp:Button ID="btnNew" CssClass="btn btn-primary btnFullSize" Text="New" runat="server" />--%>
                    </div>
                    <div class="col-md-1 padding2">
                        <asp:LinkButton ID="btnSaveTab" class="boxed-btn-layout btn-sm btn-rounded" OnClick="btnSaveTab_Click" ToolTip="Save" runat="server">
                            <i class="fa fa-save fa-2x"" aria-hidden="true"> </i> 
                        </asp:LinkButton>
                        <%--<asp:Button ID="btnSaveTab" CssClass="btn btn-primary btnFullSize" Text="Save" OnClick="btnSaveTab_Click" runat="server" />--%>
                    </div>
                    <div class="col-md-1 padding2">
                        <asp:LinkButton ID="btnCloseTab" class="boxed-btn-layout btn-sm btn-rounded" ToolTip="Close" runat="server">
                            <i class="fa fa-sign-out fa-2x"" aria-hidden="true"> </i> 
                        </asp:LinkButton>
                        <%--<asp:Button ID="btnCloseTab" CssClass="btn btn-primary btnFullSize" Text="Close" OnClick="btnCloseTab_Click" runat="server" />--%>
                    </div>                                     
                </div>
             
            </div>

            <br />
        </ContentTemplate>

    </asp:UpdatePanel>  
    
    <script type="text/javascript" src="/Scripts/lightbox/prototype.js"></script>
    <script type="text/javascript" src="/Scripts/lightbox/lightbox.js"></script>
    
    <%--<script type="text/javascript" src="/Scripts/lightbox/scriptaculous.js?load=builder"></script> --%>   
    <script type="text/javascript" src="/Scripts/lightbox/effects.js"></script>
    <script type="text/javascript" src="/Scripts/lightbox/builder.js"></script>
    
    
    <link href="https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.1/themes/base/jquery-ui.css" rel="stylesheet" type="text/css" />
    <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>  
    <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.9.1/jquery-ui.min.js"></script>
    <script>
        var $j = jQuery.noConflict();
    </script>  

    <script type="text/javascript">

        //starting test function for add textboxes

        

        //ending test function for add textboxes



        //from above

        function messageFormSubmitted(mensaje, show) {
            //debugger
            messages.alert(mensaje, { type: show });
            //setTimeout(function () {
            //    $j("#myModal").hide();
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

        $j('body').on('click', '#accordion_2 h5 a', function () {
            //debugger
            //alert("pepe");
            var collapse1 = document.getElementById('collapseOne_2');
            isActivePanel(collapse1, 2);
        });

        $j('body').on('click', '#accordion h5 a', function () {
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
                if ($j('#<%=hiddenId1.ClientID %>').val() == "0") {
                    $j('#<%=hiddenId1.ClientID %>').val("1");
                    hd1 = document.getElementById('<%=hiddenId1.ClientID%>').value;
                    //afterDdlCheck(hd1, activePanel)
                } else {
                    $j('#<%=hiddenId1.ClientID %>').val("0");
                    hd1 = document.getElementById('<%=hiddenId1.ClientID%>').value;
                    //afterDdlCheck(hd1, activePanel)
                }
            }
            if (valorActive == 2) {
                if ($j('#<%=hiddenId2.ClientID %>').val() == "0") {
                    $j('#<%=hiddenId2.ClientID %>').val("1");
                    hd2 = document.getElementById('<%=hiddenId2.ClientID%>').value;
                    //afterDdlCheck(hd2, activePanel)
                }
                else {
                    $j('#<%=hiddenId2.ClientID %>').val("0");
                    hd2 = document.getElementById('<%=hiddenId2.ClientID%>').value;
                    //afterDdlCheck(hd2, activePanel)
                }
            }

            JSFunction();
        } 

        function JSFunction() {
            //debugger

            __doPostBack('<%= updatepnl.ClientID  %>', '');
        }

        function disableInputs() {

            //debugger

            //$j("#upPanel :input").attr("disabled", true);
            //$j("#upPanel :input").prop("disabled", true);

            $j("#pnClaimDetails :input").attr("disabled", true);
            $j("#pnClaimDetails :input").prop("disabled", true);
        }

        function ToggleGridPanel(btn, row) {
            //debugger

            alert(value);
        }

        $j('body').on('click', '.nav > li > a', function (e) {

            debugger
            var data = $j(this).attr("href");
            $j('#<%=hdCurrentActiveTab.ClientID %>').val(data);
             //console.log(data);
         });

        $j('body').on('click', '.click-in', function (e) {

            var hd1 = document.getElementById('<%=hdLinkExpand.ClientID%>').value;
            //$j('#MainContent_addNewPartManual2').closest('.container').removeClass('hideProp')
            var idd = e.currentTarget.id
            //document.getElementById('<%=hiddenId2.ClientID%>').value;
            //$j('#' + idd).

            var val = $j(this).attr('CLAIM#');
            var val1 = $j(this).closest('.hideProp').removeClass('hideProp');
            //var id = $j('MainContent_grvClaimReport_lnkExpander').data('CLAIM#');
            console.log(val1);
            //console.log(id);            
            console.log(e);

        });

        $j('body').on('click', '.click-in1', function (e) {

            //debugger
            var hdGridView = document.getElementById('<%=hdGridViewContent.ClientID%>').value;
            var hdTabView = document.getElementById('<%=hdNavTabsContent.ClientID%>').value;

            if (hdGridView == "1") {
                $j('#<%=hdGridViewContent.ClientID %>').val("0");
                $j('#<%=hdNavTabsContent.ClientID %>').val("1");
            } else {
                $j('#<%=hdGridViewContent.ClientID %>').val("1");
                $j('#<%=hdNavTabsContent.ClientID %>').val("0");
            }            
            
            //var hd1 = document.getElementById('<%=hdLinkExpand.ClientID%>').value;
            //$j('#MainContent_addNewPartManual2').closest('.container').removeClass('hideProp')
            //var idd = e.currentTarget.id
            //document.getElementById('<%=hiddenId2.ClientID%>').value;
            //$j('#' + idd).

            var hdGridView = document.getElementById('<%=hdGridViewContent.ClientID%>').value;
            if (hdGridView = "0") {

                $j('#MainContent_gridviewRow').addClass('hideProp')
                $j('#MainContent_navsSection').removeClass('hideProp')

            }
            else {

                $j('#MainContent_gridviewRow').removeClass('hideProp')
                $j('#MainContent_navsSection').addClass('hideProp')
                
            }

            $j('#<%=hdAddClaimFile.ClientID %>').val("0");

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
            debugger
            if (divname == null) {
            } else {
                var iAccess = $j("#div" + divname);
                var iContainer = $j("#" + controlid.id)
                var temp2

                if (iContainer.find("i").length) {
                    temp2 = iContainer.attr('class');

                    for (var i = 0; i < iContainer.children.length; i++) {
                        if (iContainer.children(i).prop('tagName') == 'SPAN') {
                            var myControl = iContainer.children(i);
                            var iValue = myControl.children(0);
                            var iClass = iValue.attr('class');

                            var val1 = $j('#<%=hdLinkExpand.ClientID %>').val();

                            if (iClass == "fa fa-plus" && $j('#<%=hdLinkExpand.ClientID %>').val() == "0") {
                                $j('#<%=hdLinkExpand.ClientID %>').val("1");
                            } else if (iClass == "fa fa-minus" && $j('#<%=hdLinkExpand.ClientID %>').val() == "0") {  
                                $j('#<%=hdLinkExpand.ClientID %>').val("1");                                
                            } 
                        }
                    } 

                    $j('#<%=hdTriggeredControl.ClientID %>').val(divname);
                    $j('#<%=hdLaunchControl.ClientID %>').val(controlid.id);
                    $j('#<%=hdSelectedClass.ClientID %>').val(iClass);
                }
            }
        }

        function divexpandcollapse1(controlid, divname) {
            //debugger            
            if (divname == null) {
            } else {
                var iAccess = $j("#div" + divname);
                var iContainer = $j("#" + controlid.id)
                var temp2

                if (iContainer.find("i").length) {
                    temp2 = iContainer.attr('class');

                    for (var i = 0; i < iContainer.children.length; i++) {
                        if (iContainer.children(i).prop('tagName') == 'SPAN') {
                            var myControl = iContainer.children(i);
                            var iValue = myControl.children(0);
                            var iClass = iValue.attr('class');

                            var val1 = $j('#<%=hdLinkExpand.ClientID %>').val();

                            if (iClass == "fa fa-plus" && $j('#<%=hdLinkExpand.ClientID %>').val() == "0") {
                                $j('#<%=hdLinkExpand.ClientID %>').val("1");
                            } else if (iClass == "fa fa-minus" && $j('#<%=hdLinkExpand.ClientID %>').val() == "0") {  
                                $j('#<%=hdLinkExpand.ClientID %>').val("1");                                
                            } 
                        }
                    } 

                    $j('#<%=hdTriggeredControl.ClientID %>').val(divname);
                    $j('#<%=hdLaunchControl.ClientID %>').val(controlid.id);
                    $j('#<%=hdSelectedClass.ClientID %>').val(iClass);
                }
            }
        }


        //end from above

        //General Methods Begin

        function fixVisibilityColumns() {
            //debugger

            $j(".header-style").filter(function () {
                //debugger
                
                var myTd = $j(this).children("td:has('.footermark')");                
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

        function setHeight(control) {
            //debugger

            $j(control).height(1);
            $j(control).height($j(control).prop('scrollHeight'));
        }

        function activeTab() {

            //debugger
            var hd1 = document.getElementById('<%=hdCurrentActiveTab.ClientID%>').value;
            $j('.nav-tabs a[href="' + hd1 + '"]').tab('show');
        }

        function processDDLSelection(filter) {
            //debugger

            if (filter == "MainContent_ddlSearchReason") {
                var hdRe = document.getElementById('<%=hdReason.ClientID%>').value;
                $j("#<%=ddlSearchReason.ClientID%>").prop('selectedIndex', parseInt(hdRe) + 1);

            }
            else if (filter == "MainContent_ddlSearchDiagnose") {
                var hdDia = document.getElementById('<%=hdDiagnose.ClientID%>').value;
                $j("#<%=ddlSearchDiagnose.ClientID%>").prop('selectedIndex', parseInt(hdDia) + 1);

            }
            else if (filter == "MainContent_ddlSearchExtStatus") {
                var hdSt = document.getElementById('<%=hdStatusOut.ClientID%>').value;
                $j("#<%=ddlSearchExtStatus.ClientID%>").prop('selectedIndex', parseInt(hdSt) + 1);
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
                        $j('#<%=hiddenName.ClientID %>').val(id);
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
                    $j('#<%=hiddenName.ClientID %>').val(id);
                    //x.display = "block";
                }
            }
            var collapse1 = document.getElementById('collapseOne');
            var collapse2 = document.getElementById('collapseOne_2');

            var hd2 = document.getElementById('<%=hiddenId2.ClientID%>').value;
            var hd1

            if (hd2 == 1)
            {
                $j('#<%=hiddenId1.ClientID %>').val("1");
                hd1 = document.getElementById('<%=hiddenId1.ClientID%>').value;
            }
            else { hd1 = document.getElementById('<%=hiddenId1.ClientID%>').value; }

            afterRadioCheck(hd1, collapse1)
            afterRadioCheck(hd2, collapse2)
        }

        //General Methods End


        //Click Method Begin

        $j('body').on('click', '#MainContent_btnGetTemplate', function (e) {
            //debugger

            $j('#<%=hdShowTemplate.ClientID %>').val("1")
            $j('#MainContent_btnImportExcel').removeClass('hideProp')
        });

        // show import excel panel
        $j('body').on('click', '#MainContent_btnAddFiles', function (e) {
            //debugger

            var hdFile = document.getElementById('<%=hdAddClaimFile.ClientID%>').value
            if (hdFile == "0") { $j('#<%=hdAddClaimFile.ClientID %>').val("1"); }
            else { $j('#<%=hdAddClaimFile.ClientID %>').val("0"); }
        });

        $j('body').on('click', '#MainContent_btnImportExcel', function (e) {
            //debugger

            var hdFile = document.getElementById('<%=hdFileImportFlag.ClientID%>').value
            if (hdFile == "0")
                $j('#<%=hdFileImportFlag.ClientID %>').val("1")
        });

        $j('body').on('click', '#MainContent_btnExitComment', function (e) {
            //debugger

            $j('#<%=hdAddComments.ClientID %>').val("0")
            $j('#<%=hdAddVndComments.ClientID %>').val("0")            

            $j('#<%=hdSeeComments.ClientID %>').val("0")
            $j('#<%=hdSeeVndComments.ClientID %>').val("0")
        });

        $j('body').on('click', '#MainContent_btnAddComments', function (e) {
            //debugger

            var hdFile = document.getElementById('<%=hdDisplayAddVndClaim.ClientID%>').value
            if (hdFile == "0") {
                //$j('#<%=hdDisplayAddVndClaim.ClientID %>').val("1")
                $j('#<%=hdAddComments.ClientID %>').val("0")
                $j('#<%=hdAddVndComments.ClientID %>').val("1")
            }
            else {
                $j('#<%=hdAddComments.ClientID %>').val("1")
                $j('#<%=hdAddVndComments.ClientID %>').val("0")
            }

            $j('#<%=hdSeeComments.ClientID %>').val("0")
            $j('#<%=hdSeeVndComments.ClientID %>').val("0")
        });

        $j('body').on('click', '#MainContent_btnSeeComments', function (e) {
            //debugger

            var hdFile = document.getElementById('<%=hdDisplaySeeVndClaim.ClientID%>').value
            if (hdFile == "0") {
                <%--$j('#<%=hdDisplaySeeVndClaim.ClientID %>').val("1")
                $j('#<%=hdDisplayAddVndClaim.ClientID %>').val("0")--%>

                $j('#<%=hdSeeComments.ClientID %>').val("0")
                $j('#<%=hdSeeVndComments.ClientID %>').val("1")
            }
            else {
                $j('#<%=hdSeeComments.ClientID %>').val("1")
                $j('#<%=hdSeeVndComments.ClientID %>').val("0")
            }

            $j('#<%=hdAddComments.ClientID %>').val("0")
            $j('#<%=hdAddVndComments.ClientID %>').val("0")
        });

        $j('body').on('click', '#MainContent_btnExitSeeVndClaim', function (e) {
            //debugger

            var hdFile = document.getElementById('<%=hdDisplaySeeVndClaim.ClientID%>').value
            if (hdFile == "1")
                $j('#<%=hdDisplaySeeVndClaim.ClientID %>').val("0")
        });

        <%--$j('body').on('click', '#MainContent_btnAddComments', function (e) {
            //debugger

            var hdFile = document.getElementById('<%=hdAddComments.ClientID%>').value
            if (hdFile == "0")
                $j('#<%=hdAddComments.ClientID %>').val("1")
        });--%>

        $j('body').on('click', '#MainContent_btnSave', function (e) {
            //debugger

            $j('#<%=hdShowTemplate.ClientID %>').val("0")
            $j('#MainContent_btnImportExcel').addClass('hideProp')
        });

        //close import excel panel
        $j('body').on('click', "#MainContent_btnBack", function (e) {
            //debugger

            var hdFile = document.getElementById('<%=hdFileImportFlag.ClientID%>').value
            if (hdFile == "1")
                $j('#<%=hdFileImportFlag.ClientID %>').val("0")
        }); 

        $j('body').on('click', "#MainContent_btnBackFile", function (e) {
            //debugger

            var hdFile = document.getElementById('<%=hdAddClaimFile.ClientID%>').value
            if (hdFile == "1")                
                $j('#<%=hdAddClaimFile.ClientID %>').val("0")
        }); 

        //Click Method End

        //Change Method Begin

        $j('body').on('change', "#<%=ddlSearchExtStatus.ClientID %>", function () {
            var value = document.getElementById("<%=ddlSearchExtStatus.ClientID %>");
            var gettext = value.options[value.selectedIndex].text;
            var getindex = value.options[value.selectedIndex].value;
            $j('#<%=hdStatusOut.ClientID %>').val(getindex);

            var value1 = document.getElementById("<%=ddlSearchExtStatus.ClientID %>").id;
            $j('#<%=selectedFilter.ClientID %>').val(value1);

        });

        $j('body').on('change', "#<%=ddlSearchDiagnose.ClientID %>", function () {
            var value = document.getElementById("<%=ddlSearchDiagnose.ClientID %>");
            var gettext = value.options[value.selectedIndex].text;
            var getindex = value.options[value.selectedIndex].value;
            $j('#<%=hdDiagnose.ClientID %>').val(getindex);

            var value1 = document.getElementById("<%=ddlSearchDiagnose.ClientID %>").id;
            $j('#<%=selectedFilter.ClientID %>').val(value1);
        });

        $j('body').on('change', "#<%=ddlSearchReason.ClientID %>", function () {
            //debugger

            var value = document.getElementById("<%=ddlSearchReason.ClientID %>");            
            var gettext = value.options[value.selectedIndex].text;
            var getindex = value.options[value.selectedIndex].value;  
            $j('#<%=hdReason.ClientID %>').val(getindex);  

            var value1 = document.getElementById("<%=ddlSearchReason.ClientID %>").id;
            $j('#<%=selectedFilter.ClientID %>').val(value1);             
            
         });        

        function checkHdImportExcel(control) {
            var hdFile = document.getElementById('<%=hdFileImportFlag.ClientID%>').value
            if (hdFile == "0")
                $j('#<%=hdFileImportFlag.ClientID %>').val("1")
            else
                $j('#<%=hdFileImportFlag.ClientID %>').val("0")
        }

        //MainContent_ddlDiagnoseData
        $j('body').on('change', "#<%=ddlDiagnoseData.ClientID %>", function () {
            //debugger

            var valuee = $j('#<%=ddlDiagnoseData.ClientID %> option:selected').text();
            $j('#<%=hdSelectedDiagnose.ClientID %>').val(valuee);

        });

        //Change Method End      

        //Autocomplete Method Begin

        function claimNoAutoComplete() {
            $j(".autosuggestclaim").autocomplete({
                source: function (request, response) {
                    $.ajax({
                        type: "POST",
                        contentType: "application/json;charset=utf-8",
                        url: "Claims-Report.aspx/GetAutoCompleteDataClaimNo",
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
                    $j("#<%=hdClaimNoSelected.ClientID %>").val(autocomplete_value.value);
                    __doPostBack("#<%=hdClaimNoSelected.ClientID %>", "");
                }
            });
        }

        function PartNoAutoComplete() {
            $j(".autosuggestpart").autocomplete({
                source: function (request, response) {
                    $.ajax({
                        type: "POST",
                        contentType: "application/json;charset=utf-8",
                        url: "Claims-Report.aspx/GetAutoCompleteDataPartNo",
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
                    $j("#<%=hdPartNoSelected.ClientID %>").val(autocomplete_value.value);
                    __doPostBack("#<%=hdPartNoSelected.ClientID %>", "");
                }
            });
        }

        function CustomerNoAutoComplete() {
            $j(".autosuggestcustomer").autocomplete({
                source: function (request, response) {
                    $.ajax({
                        type: "POST",
                        contentType: "application/json;charset=utf-8",
                        url: "Claims-Report.aspx/GetAutoCompleteDataCustomerNo",
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
                    $j("#<%=hdCustomerNoSelected.ClientID %>").val(autocomplete_value.value);
                    __doPostBack("#<%=hdCustomerNoSelected.ClientID %>", "");
                }
            });
        }

        //Autocomplete Method End

        var divname;  

        $j(function () {

            //debugger

            console.log("BeginFunction");            

            var watermarkSearch = 'Search...';

            var hd1 = document.getElementById('<%=hiddenId1.ClientID%>').value;
            var hd2 = document.getElementById('<%=hiddenId2.ClientID%>').value;

            var collapse2 = document.getElementById('collapseOne_2');
            afterDdlCheck(hd2, collapse2);

            var collapse1 = document.getElementById('collapseOne');
            afterDdlCheck(hd1, collapse1);   

            claimNoAutoComplete()
            PartNoAutoComplete()
            CustomerNoAutoComplete() 
            
            divexpandcollapse(divname)
            
            $j('#MainContent_txtDateEntered').datepicker(
                {
                    dateFormat: 'mm/dd/yy',
                    changeMonth: true,
                    changeYear: true,
                    yearRange: '1900:2100'
                }); 

            $j('#MainContent_txtInstDate').datepicker(
                {
                    dateFormat: 'mm/dd/yy',
                    changeMonth: true,
                    changeYear: true,
                    yearRange: '1900:2100'
                });

            $j('#MainContent_txtQuarantineDate').datepicker(
                {
                    dateFormat: 'mm/dd/yy',
                    changeMonth: true,
                    changeYear: true,
                    yearRange: '1900:2100'
                });

            $j('#MainContent_txtClaimAuthDate').datepicker(
                {
                    dateFormat: 'mm/dd/yy',
                    changeMonth: true,
                    changeYear: true,
                    yearRange: '1900:2100'
                });

            $j('#MainContent_txtInitialReviewDate').datepicker(
                {
                    dateFormat: 'mm/dd/yy',
                    changeMonth: true,
                    changeYear: true,
                    yearRange: '1900:2100'
                });

            $j('#MainContent_txtAcknowledgeEmailDate').datepicker(
                {
                    dateFormat: 'mm/dd/yy',
                    changeMonth: true,
                    changeYear: true,
                    yearRange: '1900:2100'
                });

            $j('#MainContent_txtWaitSupReviewDate').datepicker(
                {
                    dateFormat: 'mm/dd/yy',
                    changeMonth: true,
                    changeYear: true,
                    yearRange: '1900:2100'
                });

            $j('#MainContent_txtInfoCustDate').datepicker(
                {
                    dateFormat: 'mm/dd/yy',
                    changeMonth: true,
                    changeYear: true,
                    yearRange: '1900:2100'
                });

            $j('#MainContent_txtPartRequestedDate').datepicker(
                {
                    dateFormat: 'mm/dd/yy',
                    changeMonth: true,
                    changeYear: true,
                    yearRange: '1900:2100'
                });

            $j('#MainContent_txtPartReceivedDate').datepicker(
                {
                    dateFormat: 'mm/dd/yy',
                    changeMonth: true,
                    changeYear: true,
                    yearRange: '1900:2100'
                });

            $j('#MainContent_txtTechReviewDate').datepicker(
                {
                    dateFormat: 'mm/dd/yy',
                    changeMonth: true,
                    changeYear: true,
                    yearRange: '1900:2100'
                });

            $j('#MainContent_txtClaimCompletedDate').datepicker(
                {
                    dateFormat: 'mm/dd/yy',
                    changeMonth: true,
                    changeYear: true,
                    yearRange: '1940:2100'
                });

            $j('#MainContent_txtInvoiceDate').datepicker(
                {
                    dateFormat: 'mm/dd/yy',
                    changeMonth: true,
                    changeYear: true,
                    yearRange: '1940:2100'
                });

            $j('#MainContent_txtInvoiceDate1').datepicker(
                {
                    dateFormat: 'mm/dd/yy',
                    changeMonth: true,
                    changeYear: true,
                    yearRange: '1940:2100'
                });

            $j.datepicker.setDefaults($j.datepicker.regional['en']);            

            var dateFormat = "mm/dd/yy",
                from = $j("#<%= txtDateInit.ClientID %>")
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
                to = $j("#<%= txtDateTo.ClientID %>").datepicker({
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
                debugger

                var date;
                try {
                    date = $j.datepicker.parseDate(dateFormat, element.value);
                } catch (error) {
                    date = null;
                }

                return date;
            }

            fixVisibilityColumns();

            setHeight($j('#MainContent_txtCustStatement'));
            
            console.log("EndFunction");

        });          

        var prmInstance = Sys.WebForms.PageRequestManager.getInstance();
        prmInstance.add_endRequest(function () {
            //you need to re-bind your jquery events here
            //debugger

            claimNoAutoComplete();
            PartNoAutoComplete();
            CustomerNoAutoComplete();
        });  

        function execDatePickers() {
            $j('#MainContent_txtDateEntered').datepicker(
                {
                    dateFormat: 'mm/dd/yy',
                    changeMonth: true,
                    changeYear: true,
                    yearRange: '1900:2100'
                });

            $j('#MainContent_txtInstDate').datepicker(
                {
                    dateFormat: 'mm/dd/yy',
                    changeMonth: true,
                    changeYear: true,
                    yearRange: '1900:2100'
                });

            $j('#MainContent_txtQuarantineDate').datepicker(
                {
                    dateFormat: 'mm/dd/yy',
                    changeMonth: true,
                    changeYear: true,
                    yearRange: '1900:2100'
                });

            $j('#MainContent_txtClaimAuthDate').datepicker(
                {
                    dateFormat: 'mm/dd/yy',
                    changeMonth: true,
                    changeYear: true,
                    yearRange: '1900:2100'
                });

            $j('#MainContent_txtInitialReviewDate').datepicker(
                {
                    dateFormat: 'mm/dd/yy',
                    changeMonth: true,
                    changeYear: true,
                    yearRange: '1900:2100'
                });

            $j('#MainContent_txtAcknowledgeEmailDate').datepicker(
                {
                    dateFormat: 'mm/dd/yy',
                    changeMonth: true,
                    changeYear: true,
                    yearRange: '1900:2100'
                });

            $j('#MainContent_txtWaitSupReviewDate').datepicker(
                {
                    dateFormat: 'mm/dd/yy',
                    changeMonth: true,
                    changeYear: true,
                    yearRange: '1900:2100'
                });

            $j('#MainContent_txtInfoCustDate').datepicker(
                {
                    dateFormat: 'mm/dd/yy',
                    changeMonth: true,
                    changeYear: true,
                    yearRange: '1900:2100'
                });

            $j('#MainContent_txtPartRequestedDate').datepicker(
                {
                    dateFormat: 'mm/dd/yy',
                    changeMonth: true,
                    changeYear: true,
                    yearRange: '1900:2100'
                });

            $j('#MainContent_txtPartReceivedDate').datepicker(
                {
                    dateFormat: 'mm/dd/yy',
                    changeMonth: true,
                    changeYear: true,
                    yearRange: '1900:2100'
                });

            $j('#MainContent_txtTechReviewDate').datepicker(
                {
                    dateFormat: 'mm/dd/yy',
                    changeMonth: true,
                    changeYear: true,
                    yearRange: '1900:2100'
                });

            $j('#MainContent_txtClaimCompletedDate').datepicker(
                {
                    dateFormat: 'mm/dd/yy',
                    changeMonth: true,
                    changeYear: true,
                    yearRange: '1900:2100'
                });

            $j('#MainContent_txtInvoiceDate').datepicker(
                {
                    dateFormat: 'mm/dd/yy',
                    changeMonth: true,
                    changeYear: true,
                    yearRange: '1940:2100'
                });

            $j('#MainContent_txtInvoiceDate1').datepicker(
                {
                    dateFormat: 'mm/dd/yy',
                    changeMonth: true,
                    changeYear: true,
                    yearRange: '1940:2100'
                });

            $j('#MainContent_txtAddCommDateInit').datepicker(
                {
                    dateFormat: 'mm/dd/yy',
                    changeMonth: true,
                    changeYear: true,
                    yearRange: '1940:2100'
                });

            $j('#MainContent_txtAddVndCommDateInit').datepicker(
                {
                    dateFormat: 'mm/dd/yy',
                    changeMonth: true,
                    changeYear: true,
                    yearRange: '1940:2100'
                });

            $j.datepicker.setDefaults($j.datepicker.regional['en']);
        }

        function pageLoad(event, args) {
            debugger
          
            console.log("BeginPageLoad");

            execDatePickers();
           
            //$j("#navsSection").removeAttr("style");

            if (args.get_isPartialLoad()) {  

                debugger
                //case fileExcel  
                var hdFile = document.getElementById('<%=hdFileImportFlag.ClientID%>').value
                if (hdFile == "1") {
                    $j('#MainContent_loadFileSection').closest('.container').removeClass('hideProp')
                } 

                var hdAddClaimFile = document.getElementById('<%=hdAddClaimFile.ClientID%>').value
                if (hdAddClaimFile == "1") { $j('#MainContent_AddFilesSection').closest('.container').removeClass('hideProp'); }
                else { $j('#MainContent_AddFilesSection').addClass('hideProp'); }

                var hdDisplaySeeVndClaim = document.getElementById('<%=hdDisplaySeeVndClaim.ClientID%>').value
                if (hdDisplaySeeVndClaim == "1") {
                    $j('#MainContent_seeVendorComments').closest('.container').removeClass('hideProp')
                } else {
                    $j('#MainContent_seeVendorComments').addClass('hideProp')
                }

                var hdAddVndComments = document.getElementById('<%=hdAddVndComments.ClientID%>').value
                if (hdAddVndComments == "1") {
                    $j('#MainContent_addVendorComments').closest('.container').removeClass('hideProp')
                } else {
                    $j('#MainContent_addVendorComments').addClass('hideProp')
                }

                var hdAddComments = document.getElementById('<%=hdAddComments.ClientID%>').value
                if (hdAddComments == "1") {
                    $j('#MainContent_addCommentsR').closest('.container').removeClass('hideProp')
                } else {
                    $j('#MainContent_addCommentsR').addClass('hideProp')
                }

                var hdSeeVndComments = document.getElementById('<%=hdSeeVndComments.ClientID%>').value
                if (hdSeeVndComments == "1") {
                    $j('#MainContent_seeVendorComments').closest('.container').removeClass('hideProp')
                } else {
                    $j('#MainContent_seeVendorComments').addClass('hideProp')
                }

                var hdSeeComments = document.getElementById('<%=hdSeeComments.ClientID%>').value
                if (hdSeeComments == "1") {
                    $j('#MainContent_seeCommentsR').closest('.container').removeClass('hideProp')
                } else {
                    $j('#MainContent_seeCommentsR').addClass('hideProp')
                }

                var hdShowBtn = document.getElementById('<%=hdShowTemplate.ClientID%>').value;
                if (hdShowBtn = "1") {
                    $j('#MainContent_btnImportExcel').removeClass('hideProp')
                }
                else {
                    $j('#MainContent_btnImportExcel').addClass('hideProp')
                }

                var hd = document.getElementById('<%=hdLinkExpand.ClientID%>').value;
                var hd1 = document.getElementById('<%=hdTriggeredControl.ClientID%>').value;
                var hd2 = document.getElementById('<%=hdLaunchControl.ClientID%>').value;

                var iAccess = $j("#div" + hd1);
                var iContainer = $j("#" + hd2);                

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

                    //$j('#MainContent_loadFileSection').closest('.container').removeClass('hideProp')
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


                $j('#<%=hdLinkExpand.ClientID %>').val("0"); 


                var hdGridVisualization = document.getElementById('<%=hdGridViewContent.ClientID%>').value
                if (hdGridVisualization == "1") {
                    $j('#MainContent_gridviewRow').closest('.container-fluid').removeClass('hideProp')
                }
                else {
                    $j('#MainContent_gridviewRow').closest('.container-fluid').addClass('hideProp')
                    $j("#MainContent_navsSection").removeAttr("style");
                }

                var hdTabsVisualization = document.getElementById('<%=hdNavTabsContent.ClientID%>').value
                if (hdTabsVisualization == "1") {
                    $j('#MainContent_navsSection').closest('.container').removeClass('hideProp')
                    $j("#MainContent_navsSection").removeAttr("style");
                }
                else {
                    $j('#MainContent_navsSection').closest('.container').addClass('hideProp')
                }

                fixVisibilityColumns();

                setHeight($j('#MainContent_txtCustStatement'));

                activeTab();
            }

            <%--var hdGridVisualization = document.getElementById('<%=hdGridViewContent.ClientID%>').value
                if (hdGridVisualization == "1") {
                    $j('#MainContent_gridviewRow').closest('.container-fluid').removeClass('hideProp')
                }
                else {
                    $j('#MainContent_gridviewRow').closest('.container-fluid').addClass('hideProp')
                }

            var hdTabsVisualization = document.getElementById('<%=hdNavTabsContent.ClientID%>').value
            if (hdTabsVisualization == "1") {
                $j('#MainContent_navsSection').closest('.container').removeClass('hideProp')
            }
            else {
                $j('#MainContent_navsSection').closest('.container').addClass('hideProp')
            }--%>

            var hd1 = document.getElementById('<%=hiddenId1.ClientID%>').value;
            var hd2 = document.getElementById('<%=hiddenId2.ClientID%>').value;

            var hdName = document.getElementById('<%=hiddenName.ClientID%>').value;
            //$j('#accordion_2 h5 a').click(function () {

            yesnoCheckCustom(hdName)           

            var collapse2 = document.getElementById('collapseOne_2');
            afterDdlCheck(hd2, collapse2);

            var collapse1 = document.getElementById('collapseOne');
            afterDdlCheck(hd1, collapse1);  

            claimNoAutoComplete()
            PartNoAutoComplete()
            CustomerNoAutoComplete()

            setHeight($j('#MainContent_txtCustStatement'));
            
            var hdFil = document.getElementById('<%=selectedFilter.ClientID%>').value;
            processDDLSelection(hdFil)

            //$j('#MainContent_txtDateTo').datepicker(
            //    {
            //        dateFormat: 'MM/dd/yyyy',
            //        changeMonth: true,
            //        changeYear: true,
            //        yearRange: '1950:2100'
            //    });

            //$j('#MainContent_txtDateInit').datepicker(
            //    {
            //        dateFormat: 'MM/dd/yyyy',
            //        changeMonth: true,
            //        changeYear: true,
            //        yearRange: '1950:2100'
            //    });

            $j.datepicker.setDefaults($j.datepicker.regional['en']);

            <%--$j("#<%= txtDateTo.ClientID %>").datepicker({
                dateFormat: 'mm/dd/yy',
                autoClose: true
                //,
                //onSelect: function () {
                //    selectedDate = $.datepicker.formatDate("yyyy/mm/dd", $j(this).datepicker());
                //}
            });

            $j("#<%= txtDateInit.ClientID %>").datepicker({
                dateFormat: 'mm/dd/yy',
                autoclose: true
                //,
                //onSelect: function () {
                //    selectedDate = $.datepicker.formatDate("yyyy/mm/dd", $j(this).datepicker());
                //}
            });--%>

            rangePicker1();

            //rangePicker2();

            //rangePicker3();

            fixVisibilityColumns();

            console.log("EndPageLoad");
        }

        function rangePicker1() {
            var dateFormat = "mm/dd/yy",
                from = $j("#<%= txtDateInit.ClientID %>")
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
                to = $j("#<%= txtDateTo.ClientID %>").datepicker({
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
                from = $j("#<%= txtAddCommDateInit.ClientID %>")
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
                to = $j("#<%= txtAddCommDateTo.ClientID %>").datepicker({
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
                from = $j("#<%= txtAddVndCommDateInit.ClientID %>")
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
                to = $j("#<%= txtAddVndCommDateTo.ClientID %>").datepicker({
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

    </script>

</asp:content>

