<%@ Page Language="vb" AutoEventWireup="false" MasterPageFile="~/Site.Master" CodeBehind="Login.aspx.vb" Inherits="ClaimsProject.Login" %>

<asp:Content ID="BodyContent" ContentPlaceHolderID="MainContent" runat="server">
    <div class="container" runat="server">
        <div class="row">
            <div class="col-md-3"></div>
            <div class="col-md-6">
                <div id="pdDisplayLogin" class="shadow-to-box">

                    <%--<asp:Login ID="lgAuthentication" OnAuthenticate="Validate_User" runat="server">
                        <LayoutTemplate>
                            <div id="lgAuthStyle">
                                <div>
                                    <asp:Literal ID="FailureText" runat="server"></asp:Literal>
                                    <asp:ValidationSummary ID="vsAuth" ValidationGroup="Login" runat="server" />
                                    <div class="row">
                                        <h1>Welcome to the CTP System</h1>
                                        <span>Some text to advise</span>
                                    </div>

                                    <div class="row">
                                        <asp:TextBox ID="UserName" placeholder="User Id" runat="server"></asp:TextBox>
                                        <asp:RequiredFieldValidator ID="frUserLogin" ControlToValidate="UserName" Display="None" 
                                            ErrorMessage="User Id is a required field" ValidationGroup="Login" runat="server">
                                        </asp:RequiredFieldValidator>
                                    </div>

                                    <div class="row">
                                        <asp:TextBox ID="Password" placeholder="Password" TextMode="Password" runat="server"></asp:TextBox>
                                        <asp:RequiredFieldValidator ID="rfPassword" ControlToValidate="Password" Display="None" 
                                            ErrorMessage="The password is a required field" ValidationGroup="Login" runat="server">
                                        </asp:RequiredFieldValidator>
                                    </div>

                                    <div class="row" style="padding: 20px 0;">
                                        <div class="col-md-4"></div>
                                        <div class="col-md-4">
                                            <asp:Button ID="Login" Text="   Login   " CommandName="Login" class="btn btn-primary btn-lg btnFullSize" ValidationGroup="Login"  runat="server" />
                                        </div>
                                        <div class="col-md-4"></div>
                                    </div>

                                </div>
                            </div>
                        </LayoutTemplate>
                    </asp:Login>--%>

                    <div>
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
                                    <span class="input-group-addon"><i class="fa fa-user center-vert font-awesome-custom"></i></span>
                                </div>
                            </div>
                            <div class="col-md-5">
                                <%--<asp:Label ID="lblPass" Text="Password" CssClass="control-label" runat="server"></asp:Label>--%>
                                <div class="input-group-append">
                                    <asp:TextBox ID="txtPass" CssClass="form-control" name="txt-pass" placeholder="PASSWORD" runat="server"></asp:TextBox>
                                    <span class="input-group-addon"><i class="fa fa-key center-vert font-awesome-custom"></i></span>
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
            </div>
            <div class="col-md-3"></div>
        </div>        
    </div>
</asp:Content>
