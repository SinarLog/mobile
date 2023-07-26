import { useState } from "react"

const WhosTakingLeaveModel = ({ navigation }) => {
    const [inputFocused, setInputFocused] = useState(false)
    const [value, setValue] = useState('')
    const takingLeaves = [
        {
            "id": "b4473d01-a3c9-4a18-9342-b29848f9e893",
            "avatar": "https://firebasestorage.googleapis.com/v0/b/sinarlog.appspot.com/o/avatar%2F631223a8-3fd2-4666-98d2-9676974a3af6?alt=media&",
            "fullName": "Michelle Gunawan",
            "requestDate": "2023-07-10",
            "from": "2023-07-18",
            "to": "2023-07-20",
            "duration": 3,
            "type": "ANNUAL",
            "status": "APPROVED"
        },
        {
            "id": "0ab08c19-a279-4200-b39a-998363cee824",
            "avatar": "https://firebasestorage.googleapis.com/v0/b/sinarlog.appspot.com/o/avatar%2F185c3ace-fa70-4721-846c-d57b4291de71?alt=media&",
            "fullName": "Rifky Manuel Satyana",
            "requestDate": "2023-07-10",
            "from": "2023-07-18",
            "to": "2023-07-19",
            "duration": 2,
            "type": "ANNUAL",
            "status": "APPROVED"
        },
        {
            "id": "a579780e-8fd3-4141-a346-23ea71b32205",
            "fullName": "Rifky Manuel Satyana",
            "requestDate": "2023-07-06",
            "from": "2023-07-20",
            "to": "2023-07-20",
            "duration": 1,
            "type": "ANNUAL",
            "status": "APPROVED"
        },
        {
            "id": "87daccdb-1744-40cb-8748-133345c6fa8e",
            "fullName": "Rifky Manuel Satyana",
            "requestDate": "2023-07-06",
            "from": "2023-07-17",
            "to": "2023-07-19",
            "duration": 3,
            "type": "MARRIAGE",
            "status": "APPROVED"
        },
        {
            "id": "3dc62e2b-e711-4b4a-98ef-7659d0412c02",
            "avatar": "https://firebasestorage.googleapis.com/v0/b/sinarlog.appspot.com/o/avatar%2F576720f2-6cb8-4c5c-8e38-946514fcfb2e?alt=media&",
            "fullName": "Nakata Mukora Japanista",
            "requestDate": "2023-07-05",
            "from": "2023-07-24",
            "to": "2023-07-26",
            "duration": 3,
            "type": "ANNUAL",
            "status": "APPROVED"
        },
        {
            "id": "f937c8bf-50c5-4e8a-b821-2892d9caf22a",
            "avatar": "https://firebasestorage.googleapis.com/v0/b/sinarlog.appspot.com/o/avatar%2F576720f2-6cb8-4c5c-8e38-946514fcfb2e?alt=media&",
            "fullName": "Nakata Mukora Japanista",
            "requestDate": "2023-07-05",
            "from": "2023-07-20",
            "to": "2023-07-21",
            "duration": 2,
            "type": "ANNUAL",
            "status": "APPROVED"
        },
        {
            "id": "4d85d089-742b-4f4f-9b2b-f54060d21a93",
            "avatar": "https://firebasestorage.googleapis.com/v0/b/sinarlog.appspot.com/o/avatar%2F576720f2-6cb8-4c5c-8e38-946514fcfb2e?alt=media&",
            "fullName": "Nakata Mukora Japanista",
            "requestDate": "2023-07-05",
            "from": "2023-07-17",
            "to": "2023-07-19",
            "duration": 3,
            "type": "MARRIAGE",
            "status": "APPROVED"
        }
    ]

    const search = {
        inputFocused,
        setInputFocused,
        value,
        setValue
    }

    return {
        takingLeaves,
        search
    }
}

export default WhosTakingLeaveModel