import { useState, useEffect } from 'react'
import vendorsData from '../data/vendors.json'

export default function useVendors() {
  const [vendors, setVendors]       = useState([])
  const [fishFryInfo, setFishFryInfo] = useState(null)
  const [loading, setLoading]       = useState(true)
  const [error, setError]           = useState(null)

  useEffect(() => {
    try {
      // Simulating an async database call.
      // When we swap to Supabase, this try/catch becomes a real fetch.
      setVendors(vendorsData.vendors)
      setFishFryInfo(vendorsData.fishFryInfo)
      setLoading(false)
    } catch (err) {
      setError('Failed to load vendor data.')
      setLoading(false)
    }
  }, [])

  const getVendorById = (id) => {
    return vendors.find(vendor => vendor.id === id) || null
  }

  const getOpenVendors = () => {
    return vendors.filter(vendor => vendor.status === 'open')
  }

  const getVendorsByCategory = (category) => {
    return vendors.filter(vendor =>
      vendor.menu.some(item => item.category === category)
    )
  }

  return {
    vendors,
    fishFryInfo,
    loading,
    error,
    getVendorById,
    getOpenVendors,
    getVendorsByCategory,
  }
}