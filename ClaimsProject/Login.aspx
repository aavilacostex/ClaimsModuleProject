<%@ Page Language="vb" AutoEventWireup="false" MasterPageFile="~/Site.Master" CodeBehind="Login.aspx.vb" Inherits="ClaimsProject.Login" %>

<asp:Content ID="BodyContent" ContentPlaceHolderID="MainContent" runat="server">
    <div class="container" runat="server">
        <div class="row">
            <div class="col-md-3"></div>
            <div class="col-md-6">
                <div id="pdDisplayLogin" class="shadow-to-box">
                    <!-- first row -->
                    <div class="row" style="padding: 30px 0;">
                        <div class="col-md-2"></div>
                        <div class="col-md-8 centered"><span id="spnLoadText">Welcome to the CTP System</span></div>
                        <div class="col-md-2"></div>
                    </div>
                    <!-- Second row -->
                    <div class="form-row">
                        <div class="col-md-1"></div>
                        <div class="col-md-5">
                            <%--<asp:Label ID="lblUser" Text="User" CssClass="control-label" runat="server"> </asp:Label>--%>
                            <div class="input-group-append">
                                <asp:TextBox ID="txtUser" CssClass="form-control" name="txt-user" placeholder="USER" runat="server"></asp:TextBox>
                                <span class="input-group-addon"><i class="fa fa-hashtag center-vert font-awesome-custom"></i></span>
                            </div>
                        </div>
                        <div class="col-md-5">
                            <%--<asp:Label ID="lblPass" Text="Password" CssClass="control-label" runat="server"></asp:Label>--%>
                            <div class="input-group-append">
                                <asp:TextBox ID="txtPass" CssClass="form-control" name="txt-pass" placeholder="PASSWORD" runat="server"></asp:TextBox>
                                <span class="input-group-addon"><i class="fa fa-hashtag center-vert font-awesome-custom"></i></span>
                            </div>
                        </div>
                        <div class="col-md-1"></div>
                    </div>
                    <!-- Third row -->
                    <div class="row" style="padding: 20px 0;">
                        <div class="col-md-4"></div>
                        <div class="col-md-4"> 
                            <asp:Button ID="btnLoginUser" Text="   Login   " class="btn btn-primary btn-lg btnFullSize" OnClick="btnLogin_Click" runat="server" />
                        </div>
                        <div class="col-md-4"></div>
                    </div>
                </div>                
            </div>
            <div class="col-md-3"></div>
        </div>        
    </div>
</asp:Content>
