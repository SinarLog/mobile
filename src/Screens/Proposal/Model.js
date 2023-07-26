import { useCallback, useEffect, useMemo, useRef, useState } from "react"

const ProposalModel = ({ navigation }) => {

    const [topTabView, setTopTabView] = useState('Incoming')
    const [incomingTabView, setIncomingTabView] = useState('Leave')

    const topView = {
        topTabView,
        setTopTabView
    }

    const incomingView = {
        incomingTabView,
        setIncomingTabView,
    }

    return {
        topView,
        incomingView,
    }
}

export default ProposalModel