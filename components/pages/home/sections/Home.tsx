"use client";
export const dynamic = "force-dynamic";
import { useEffect, useRef, useState } from "react";
import styles from "./Home.module.scss";
import { useGetWeddings } from "@/api/wedding";
import { useCreateRSVP } from "@/api/rsvp";
import { useRouter } from "next/navigation";

const Home = () => {
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
  }>({
    days: 0,
    hours: 0,
    minutes: 0,
  });
  const router = useRouter();
  const MAP_LINK =
    "https://2gis.kg/bishkek/firm/70000001063765710?m=74.058783%2C42.839878%2F16.16";

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState<"ATTENDING" | "DECLINED">("ATTENDING");
  // const [started, setStarted] = useState(false);

  const { data } = useGetWeddings();
  const wedding = data?.[0];

  // const audioRef = useRef<HTMLAudioElement | null>(null);

  const { mutate } = useCreateRSVP(wedding?.id ?? "");

  // useEffect(() => {
  //   if (!audioRef.current) return;

  //   // пытаемся сразу запустить (будет muted)
  //   audioRef.current.play().catch(() => {});

  //   const enableSound = () => {
  //     if (!audioRef.current) return;

  //     audioRef.current.muted = false;
  //     audioRef.current.play().catch(() => {});

  //     window.removeEventListener("click", enableSound);
  //   };

  //   window.addEventListener("click", enableSound);

  //   return () => window.removeEventListener("click", enableSound);
  // }, []);

  // useEffect(() => {
  //   if (!audioRef.current || !started) return;

  //   audioRef.current.muted = false;
  //   audioRef.current.play().catch(() => {});
  // }, [started]);
  useEffect(() => {
    if (!wedding) return;

    const update = () => {
      const diff = new Date(wedding.date).getTime() - Date.now();

      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0 });
        return;
      }

      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / 1000 / 60) % 60),
      });
    };

    update();
    const interval = setInterval(update, 1000);

    return () => clearInterval(interval);
  }, [wedding]);

  // ❗ только после всех хуков
  if (!wedding) return null;

  const weddingDay = new Date(wedding.date).getDate();

  const handleSubmit = () => {
    mutate({ name, phone, status });
    alert("Жооп жөнөтүлдү");
  };

  return (
    <div className={styles.page}>
      {/* <audio ref={audioRef} src="/music.mp3" loop preload="auto" />
      {!started && (
        <div className={styles.overlay} onClick={() => setStarted(true)}>
          <div className={styles.overlayContent}>
            <div className={styles.ring}>💍</div>

            <p className={styles.inviteTop}>Урматтуу коноктор</p>

            <h1 className={styles.inviteTitle}>Тойго чакыруу</h1>

            <p className={styles.inviteText}>
              Сиздерди биздин жашообуздагы эң маанилүү, эң кубанычтуу күнгө —
              үйлөнүү тоюбузга чын жүрөктөн чакырабыз
            </p>

            <p className={styles.inviteSub}>
              Бул күн сүйүүнүн, бакыттын жана жаңы жашоонун башталышы
            </p>

            <span className={styles.inviteAction}>
              Ачуу үчүн акырын басыңыз
            </span>
          </div>
        </div>
      )} */}
      {/* HERO */}
      <div className={styles.hero}>
        <img
          src="https://images.unsplash.com/photo-1519741497674-611481863552"
          className={styles.heroImage}
        />
        <div className={styles.topText}>
          Биздин үйлөнүү күнү <br /> Сүйүүнүн салтанаты
        </div>
        <div className={styles.bottomNames}>
          <span className={styles.name}>
            {wedding.coupleNames?.split(" & ")[0]}
          </span>
          <span className={styles.and}>&</span>
          <span className={styles.name}>
            {wedding.coupleNames?.split(" & ")[1]}
          </span>
          <div className={styles.line}></div>
        </div>
      </div>

      {/* LOVE TEXT */}
      <section className={styles.inviteSection}>
        <h2 className={styles.inviteTitl}>Кымбаттуу коноктор!</h2>
        <p className={styles.inviteTex}>
          Биздин жашообуздагы эң маанилүү жана эң кубанычтуу күн — биздин
          үйлөнүү тоюбузга сизди чын жүрөктөн чакырабыз
        </p>
        <p className={styles.inviteTex}>
          Бул күн биздин сүйүүбүздүн башталышы гана эмес, эки жүрөктүн бириккен
          өзгөчө көз ирмеми
        </p>
        <p className={styles.inviteTex}>
          Сиздин катышууңуз бул күндү дагы да жарык, дагы да эстен кеткис
          кылатып
        </p>
        <p className={styles.inviteTex}>
          Биз менен бирге бул кубанычтуу күндү бөлүшүп, жылуулук жана сүйүү
          тартуулаңыз
        </p>
        <p className={styles.mapText}>Салтанат өткөрүлө турган өзгөчө жай</p>

        <h3 className={styles.mapVenue}>{wedding.ceremonyVenue}</h3>

        <p className={styles.mapSubtext}>
          Бул бактылуу күндү сиздер менен ушул жерде бөлүшөбүз
        </p>

        <button
          className={styles.mapBtn}
          onClick={() => window.open(MAP_LINK, "_blank")}
        >
          Картадан ачуу
        </button>
      </section>

      {/* TIMER */}
      <section className={styles.timerSection}>
        <h2 className={styles.timerTitle}>Тойго чейин</h2>
        <div className={styles.timerCircles}>
          <div className={styles.circle}>
            <span suppressHydrationWarning>{timeLeft.days}</span>
            <p>күн</p>
          </div>
          <div className={styles.circle}>
            <span suppressHydrationWarning>{timeLeft.hours}</span>
            <p>саат</p>
          </div>
          <div className={styles.circle}>
            <span suppressHydrationWarning>{timeLeft.minutes}</span>
            <p>мүн</p>
          </div>
        </div>
        <p className={styles.timerText}>
          Биз бул күндү чыдамсыздык менен күтүп жатабыз
        </p>
      </section>

      {/* CALENDAR */}
      <section className={styles.calendar}>
        <h2>Той күнү</h2>
        <p className={styles.date} suppressHydrationWarning>
          {new Date(wedding.date).toLocaleDateString("ky-KG")}
        </p>
        <div className={styles.grid}>
          {Array.from({ length: 30 }, (_, i) => {
            const day = i + 1;
            return (
              <div
                key={day}
                className={`${styles.day} ${
                  day === weddingDay ? styles.active : ""
                }`}
              >
                {day}
              </div>
            );
          })}
        </div>
      </section>

      {/* PROGRAM */}
      <section className={styles.program}>
        <h2 className={styles.title}>Той программасы</h2>
        <p className={styles.subtitle}>
          Бул өзгөчө күндү сиздер менен бөлүшүү — биз үчүн чоң бакыт
        </p>
        <div className={styles.timeline}>
          <div className={styles.item}>
            <div className={styles.time}>16:00</div>
            <div className={styles.dot}></div>
            <div className={styles.content}>
              <h3>Конокторду тосуп алуу</h3>
              <p>
                Урматтуу коноктор, сиздерди жылуу тосуп алып, жүзүңүздөрдө
                жылмаюу менен биздин майрамыбызды баштайбыз
              </p>
            </div>
          </div>
          <div className={styles.item}>
            <div className={styles.time}>16:30</div>
            <div className={styles.dot}></div>
            <div className={styles.content}>
              <h3>Тойдун башталышы</h3>
              <p>
                Эки жаштын жаңы жашоосуна кадам таштаган салтанаттуу учур. Бул
                көз ирмем биздин жүрөгүбүздө түбөлүк сакталат
              </p>
            </div>
          </div>
          <div className={styles.item}>
            <div className={styles.time}>17:00</div>
            <div className={styles.dot}></div>
            <div className={styles.content}>
              <h3>Банкет жана оюн-зоок</h3>
              <p>
                Даамдуу тамактар, кубанычтуу күлкү, бийлер жана унутулгус көз
                ирмемдер сиздерди күтөт
              </p>
            </div>
          </div>
        </div>
        <p className={styles.footerText}>
          Сиздин катышууңуз биздин бактыбызды толуктайт
        </p>
      </section>

      {/* GALLERY */}
      <section className={styles.gallery}>
        <h2>Биздин көз ирмемдер</h2>
        <div className={styles.photos}>
          <img src="https://images.unsplash.com/photo-1522673607200-164d1b6ce486" />
          <img src="https://images.unsplash.com/photo-1519741497674-611481863552" />
          <img src="https://images.unsplash.com/photo-1529636798458-92182e662485" />
        </div>
      </section>

      <section className={styles.afterGallery}>
        <h2>Сүйүү — бул эки жүрөктүн бир согушу</h2>
        <p>
          Биздин сүйүүбүз — бул жөн гана жолугушуу эмес, бул тагдырдын белеги.
          Сиздер менен бул бакытты бөлүшүү — биз үчүн чоң сыймык
        </p>
        <p>
          Ар бир көз ирмем, ар бир жылмаюу — биздин жашообуздагы эң кымбат
          эстеликтерге айланат
        </p>
        <p className={styles.signature}>Сүйүү менен, {wedding.coupleNames}</p>
      </section>

      {/* RSVP */}
      <section className={styles.form}>
        <h2>Катышууңузду тастыктаңыз</h2>
        <input
          placeholder="Атыңыз"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          placeholder="Телефон"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <div className={styles.buttons}>
          <button
            onClick={() => setStatus("ATTENDING")}
            className={`${styles.btn} ${
              status === "ATTENDING" ? styles.active : ""
            }`}
          >
            Барам
          </button>
          <button
            onClick={() => setStatus("DECLINED")}
            className={`${styles.btn} ${
              status === "DECLINED" ? styles.activeDecline : ""
            }`}
          >
            Барбайм
          </button>
        </div>
        <button className={styles.submit} onClick={handleSubmit}>
          Жөнөтүү
        </button>
      </section>

      <section className={styles.guestsSection}>
        <h2>Коноктор</h2>
        <p>Тойго чакырылган коноктордун тизмеси менен таанышыңыз</p>
        <button
          className={styles.guestsBtn}
          onClick={() => router.push(`/guests/${wedding.id}`)}
        >
          Коноктордун тизмеси
        </button>
      </section>
    </div>
  );
};

export default Home;
