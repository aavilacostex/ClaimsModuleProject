Public Class ClaimDepartment

    Sub MySub()
        _selfClaimDptoObj = New ClaimDepartment()
    End Sub

    Private _claimDiagnose As String
    Public Property ClaimDiagnose() As String
        Get
            Return _claimDiagnose
        End Get
        Set(ByVal value As String)
            _claimDiagnose = value
        End Set
    End Property

    Private _claimReason As String
    Public Property ClaimReason() As String
        Get
            Return _claimReason
        End Get
        Set(ByVal value As String)
            _claimReason = value
        End Set
    End Property

    Private _claimProductionCode As String
    Public Property ClaimProdCode() As String
        Get
            Return _claimProductionCode
        End Get
        Set(ByVal value As String)
            _claimProductionCode = value
        End Set
    End Property

    Private _claimVendorNo As String
    Public Property ClaimVendorNo() As String
        Get
            Return _claimVendorNo
        End Get
        Set(ByVal value As String)
            _claimVendorNo = value
        End Set
    End Property

    Private _claimVendorName As String
    Public Property ClaimVendorName() As String
        Get
            Return _claimVendorName
        End Get
        Set(ByVal value As String)
            _claimVendorName = value
        End Set
    End Property

    Private _claimSbClaimedParts As String
    Public Property ClaimSbClaimedParts() As String
        Get
            Return _claimSbClaimedParts
        End Get
        Set(ByVal value As String)
            _claimSbClaimedParts = value
        End Set
    End Property

    Private _claimSbClaimedFreight As String
    Public Property ClaimSbClaimedFreight() As String
        Get
            Return _claimSbClaimedFreight
        End Get
        Set(ByVal value As String)
            _claimSbClaimedFreight = value
        End Set
    End Property

    Private _claimConsequentalDamageCost As String
    Public Property ClaimConsequentalDamageCost() As String
        Get
            Return _claimConsequentalDamageCost
        End Get
        Set(ByVal value As String)
            _claimConsequentalDamageCost = value
        End Set
    End Property

    Private _claimQuarantineRequired As Boolean
    Public Property ClaimQuarantineReq() As Boolean
        Get
            Return _claimQuarantineRequired
        End Get
        Set(ByVal value As Boolean)
            _claimQuarantineRequired = value
        End Set
    End Property

    Private _claimConsequentalApp As Boolean
    Public Property ClaimConsequentalApp() As String
        Get
            Return _claimConsequentalApp
        End Get
        Set(ByVal value As String)
            _claimConsequentalApp = value
        End Set
    End Property

    Private _claimConsequentalDec As Boolean
    Public Property ClaimConsequentalDec() As Boolean
        Get
            Return _claimConsequentalDec
        End Get
        Set(ByVal value As Boolean)
            _claimConsequentalDec = value
        End Set
    End Property

    Private _barSeq As String
    Public Property BarSequence() As String
        Get
            Return _barSeq
        End Get
        Set(ByVal value As String)
            _barSeq = value
        End Set
    End Property

    Private _receiving As String
    Public Property Receiving() As String
        Get
            Return _receiving
        End Get
        Set(ByVal value As String)
            _receiving = value
        End Set
    End Property

    Private _selfClaimDptoObj As ClaimDepartment
    Public Property SelfClaimDptoObj() As ClaimDepartment
        Get
            Return _selfClaimDptoObj
        End Get
        Set(ByVal value As ClaimDepartment)
            _selfClaimDptoObj = value
        End Set
    End Property

End Class
