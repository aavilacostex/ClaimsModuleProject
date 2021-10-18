<%@ Page Language="vb" AutoEventWireup="true" CodeBehind="SeeFiles.aspx.vb" MasterPageFile="~/Site.Master" Inherits="ClaimsProject.SeeFiles" ViewStateMode="Disabled" %>

<asp:Content ID="BodyContent" ContentPlaceHolderID="MainContent" runat="server">

    <div class="col-md-12">
        <h3><asp:Label ID="lblSecondTabDesc" Text="Files for Warning Number"  runat="server"></asp:Label></h3>
        <div class="row">
            <div class="col-md-6"> 
                <div class="row">

                    <asp:Panel ID="pnPartImage" GroupingText="Part Images" runat="server">
                        <div class="form-row last">
                            <div class="col-md-12">

                                <asp:DataList ID="datViewer" CssClass="inheritclass" RepeatColumns="3" CellPadding="5" EnableViewState="true" ViewStateMode="Enabled" runat="server">
                                    <ItemTemplate>
                                        <div id="wrapper">
                                            <a id="alink" href='<%# Container.DataItem %>' data-lightbox="roadtrip" rel="group" runat="server">
                                                <%-- class="zb" --%>
                                                <asp:Image ID="Img" CssClass="imgStyle" ImageUrl='<%# Container.DataItem %>' Width="100" Height="100" runat="server" />
                                            </a>
                                        </div>
                                    </ItemTemplate>
                                </asp:DataList>

                            </div>
                        </div>
                    </asp:Panel>

                </div>
            </div>
        </div>
    </div>

</asp:Content>
