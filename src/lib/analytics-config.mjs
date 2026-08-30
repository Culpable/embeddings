function clampRecordingPercent(value) {
  if (!Number.isFinite(value)) {
    return 0
  }

  return Math.min(100, Math.max(0, value))
}


export const mixpanelRecordingPercent = clampRecordingPercent(
  Number(process.env.NEXT_PUBLIC_MIXPANEL_RECORDING_PERCENT ?? '0'),
)

export const mixpanelRecordsHeatmaps =
  process.env.NEXT_PUBLIC_MIXPANEL_RECORD_HEATMAPS === 'true'

export const mixpanelRecorderEnabled =
  mixpanelRecordingPercent > 0 || mixpanelRecordsHeatmaps
