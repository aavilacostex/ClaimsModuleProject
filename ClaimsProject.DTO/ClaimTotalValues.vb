Public Class ClaimTotalValues

    Public Sub New()
        _amountApproved = "0"
        _curuserLimit = "0"
        _unitCostValue = "0"
        _totalConsDamageValue = "0"
        _consDmgLaborValue = "0"
        __consDmgMiscValue = "0"
        __consDmgFreightValue = "0"
        _consDmgPartValue = "0"
        _claimTotalValue = "0"
    End Sub

    Private _wrnNo As String
    Public Property WrnNo() As String
        Get
            Return _wrnNo
        End Get
        Set(ByVal value As String)
            _wrnNo = value
        End Set
    End Property

    Private _returnNo As String
    Public Property ReturnNo() As String
        Get
            Return _returnNo
        End Get
        Set(ByVal value As String)
            _returnNo = value
        End Set
    End Property

    Private _curuserLimit As String
    Public Property UserLimit() As String
        Get
            Return _curuserLimit
        End Get
        Set(ByVal value As String)
            _curuserLimit = value
        End Set
    End Property

    Private _unitCostValue As String
    Public Property UnitCostValue() As String
        Get
            Return _unitCostValue
        End Get
        Set(ByVal value As String)
            _unitCostValue = value
        End Set
    End Property

    Private _amountApproved As String
    Public Property AmountApproved() As String
        Get
            Return _amountApproved
        End Get
        Set(ByVal value As String)
            _amountApproved = value
        End Set
    End Property

    Private _totalConsDamageValue As String
    Public Property TotalConsDamage() As String
        Get
            Return _totalConsDamageValue
        End Get
        Set(ByVal value As String)
            _totalConsDamageValue = value
        End Set
    End Property

    Private _consDmgLaborValue As String
    Public Property CDLaborValue() As String
        Get
            Return _consDmgLaborValue
        End Get
        Set(ByVal value As String)
            _consDmgLaborValue = value
        End Set
    End Property

    Private __consDmgMiscValue As String
    Public Property CDMiscValue() As String
        Get
            Return __consDmgMiscValue
        End Get
        Set(ByVal value As String)
            __consDmgMiscValue = value
        End Set
    End Property

    Private __consDmgFreightValue As String
    Public Property CDFreightValue() As String
        Get
            Return __consDmgFreightValue
        End Get
        Set(ByVal value As String)
            __consDmgFreightValue = value
        End Set
    End Property

    Private _consDmgPartValue As String
    Public Property CDPartValue() As String
        Get
            Return _consDmgPartValue
        End Get
        Set(ByVal value As String)
            _consDmgPartValue = value
        End Set
    End Property

    Private _claimTotalValue As String
    Public Property ClaimGrandTotal() As String
        Get
            Return _claimTotalValue
        End Get
        Set(ByVal value As String)
            _claimTotalValue = value
        End Set
    End Property

End Class
