export const fetchListInit = async () => {
    const response = await fetch(`${process.env.REACT_APP_CURRENT_URL}/api/news`);
    if(!response.ok) {
        throw new Error(response.statusText);
    }
    return await response.json();
}

export const fetchPreviousPosts = async (id) => {
    const query = new URLSearchParams({ lastSeenId: id });
    const response = await fetch(`${process.env.REACT_APP_CURRENT_URL}/api/news?${query}`);
    if(!response.ok) {
        throw new Error(response.statusText);
    }
    return await response.json();
}