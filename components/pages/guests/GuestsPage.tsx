"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useGetGuests } from "@/api/rsvp";
import scss from "./GuestsPage.module.scss";

export default function GuestsPage() {
  const router = useRouter();
  const params = useParams();

  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  const [search, setSearch] = useState("");

  const { data, isLoading } = useGetGuests(id || "");

  if (!id) return <div className={scss.center}>ID жок</div>;

  if (isLoading) return <div className={scss.center}>Жүктөлүүдө...</div>;

  const attendingCount = data?.filter((g: any) => g.status === "ATTENDING").length || 0;
  const declinedCount = data?.filter((g: any) => g.status === "DECLINED").length || 0;
  const total = data?.length || 0;

  const filteredGuests = data?.filter((g: any) =>
    g.name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className={scss.page}>
      <div className={scss.header}>
        <button onClick={() => router.back()} className={scss.backBtn}>
          <span className={scss.arrow}>←</span>
          Артка
        </button>
      </div>

      <h1 className={scss.title}>Коноктор</h1>
      <p className={scss.subtitle}>Биз менен бул күндү бөлүшө турган адамдар</p>

      <div className={scss.stats}>
        <div className={scss.statBox}>
          <span suppressHydrationWarning>{attendingCount}</span>
          <p>Келет</p>
        </div>
        <div className={scss.statBox}>
          <span suppressHydrationWarning>{declinedCount}</span>
          <p>Келбейт</p>
        </div>
        <div className={scss.statBox}>
          <span suppressHydrationWarning>{total}</span>
          <p>Жалпы</p>
        </div>
      </div>

      <div className={scss.searchBox}>
        <input
          type="text"
          placeholder="Издөө... (аты боюнча)"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={scss.searchInput}
        />
      </div>

      <div className={scss.list}>
        {filteredGuests?.map((g: any) => (
          <div key={g.id} className={scss.card}>
            <div className={scss.avatar}>{g.name?.charAt(0).toUpperCase()}</div>
            <div className={scss.info}>
              <h3>{g.name}</h3>
              <p>{g.phone || "Телефон жок"}</p>
              <span
                className={`${scss.status} ${
                  g.status === "ATTENDING"
                    ? scss.green
                    : g.status === "DECLINED"
                      ? scss.red
                      : scss.gray
                }`}
              >
                {g.status === "ATTENDING"
                  ? "Келет ✅"
                  : g.status === "DECLINED"
                    ? "Келбейт ❌"
                    : "Жооп жок"}
              </span>
              {g.plusOne && <span className={scss.plusOne}>+1 менен келет</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}