const equipmentQrPrefix = 'ILABGEST:EQUIPMENT:'

export const equipmentQrPayload = id => `${equipmentQrPrefix}${id}`

export const parseEquipmentQrPayload = value => {
    if (typeof value !== 'string') return null

    const match = value.trim().match(/^ILABGEST:EQUIPMENT:([a-f\d]{24})$/i)
    return match ? match[1].toLowerCase() : null
}
