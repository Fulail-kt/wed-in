import { r as __exportAll } from "./rolldown-runtime_CE-6LUnI.mjs";
import { i as renderComponent, m as maybeRenderHead, u as renderTemplate, w as createAstro } from "./server_C_mbWrjf.mjs";
import { t as createComponent } from "./compiler_DNGa_OgE.mjs";
import { n as weddingConfig, t as $$Layout } from "./Layout_DSJvfRND.mjs";
import { a as getGuest, r as formatGuestName } from "./guests_CO5La-UZ.mjs";
import { memo, useEffect, useRef, useState } from "react";
import { AnimatePresence, animate, motion, useMotionValue, useTransform } from "framer-motion";
import { ArrowUpRight, CalendarHeart, ChevronLeft, ChevronRight, Heart, Loader2, MapPin, Minus, Music2, Navigation, Plus } from "lucide-react";
import { jsx, jsxs } from "react/jsx-runtime";
//#region src/components/HeroBanner.tsx
function HeroBanner({ guestName }) {
	return /* @__PURE__ */ jsx("section", {
		className: "w-full flex flex-col items-center text-center pb-2",
		children: /* @__PURE__ */ jsx("div", {
			className: "w-full max-w-3xl mx-auto",
			children: /* @__PURE__ */ jsxs(motion.div, {
				initial: {
					opacity: 0,
					y: 24
				},
				animate: {
					opacity: 1,
					y: 0
				},
				transition: {
					duration: .9,
					ease: [
						.22,
						1,
						.36,
						1
					]
				},
				className: "w-full bg-[var(--bg-card)] border border-[#E8E2D8] rounded-t-[150px] md:rounded-t-[200px] rounded-b-[1.75rem] px-8 py-14 sm:px-12 sm:py-16 md:px-20 md:py-20 shadow-[0_14px_48px_rgba(42,37,35,0.045)] flex flex-col items-center relative overflow-hidden",
				children: [
					/* @__PURE__ */ jsx("div", { className: "absolute inset-4 pt-5! sm:inset-5 md:inset-6 border border-[#C2A166]/25 rounded-t-[135px] md:rounded-t-[180px] rounded-b-[1.25rem] pointer-events-none" }),
					/* @__PURE__ */ jsxs("div", {
						className: "mb-7 w-full flex flex-col items-center gap-2.5",
						children: [
							/* @__PURE__ */ jsx("p", {
								className: "font-arabic text-3xl md:text-5xl text-[#2A2523] leading-loose tracking-wide",
								children: "بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ"
							}),
							/* @__PURE__ */ jsx("p", {
								className: "text-[10px] tracking-[0.28em] uppercase text-[#8A827B] font-medium max-w-lg leading-relaxed",
								children: "In the name of Allah the Most Gracious and the Most Merciful"
							}),
							/* @__PURE__ */ jsx("div", { className: "w-14 h-px bg-[#C2A166]/45 mt-3" })
						]
					}),
					/* @__PURE__ */ jsx(AnimatePresence, { children: guestName ? /* @__PURE__ */ jsxs(motion.div, {
						initial: {
							opacity: 0,
							y: -8
						},
						animate: {
							opacity: 1,
							y: 0
						},
						transition: {
							duration: .5,
							delay: .2
						},
						className: "guest-invite-block mx-auto text-center",
						children: [/* @__PURE__ */ jsx("p", {
							className: "guest-invite-block__label",
							children: "Exclusive Invitation for"
						}), /* @__PURE__ */ jsx("p", {
							className: "guest-invite-block__name",
							children: guestName
						})]
					}) : /* @__PURE__ */ jsx(motion.p, {
						initial: { opacity: 0 },
						animate: { opacity: 1 },
						transition: { delay: .2 },
						className: "text-[11px] tracking-[0.22em] uppercase text-[#8A827B] font-medium mb-6 max-w-lg leading-relaxed px-2",
						children: "Request the honour of your presence at the Nikah ceremony of their beloved children"
					}) }),
					/* @__PURE__ */ jsxs("div", {
						className: "mb-1 w-full flex flex-col items-center gap-2",
						children: [/* @__PURE__ */ jsx("h1", {
							className: "font-serif-title text-5xl md:text-7xl text-[#2A2523] tracking-tight font-normal leading-[1.1]",
							children: weddingConfig.groom
						}), /* @__PURE__ */ jsx("p", {
							className: "text-[11px] md:text-xs tracking-[0.18em] uppercase text-[#8A827B] font-medium",
							children: weddingConfig.groomParents
						})]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "flex items-center justify-center gap-5 my-6 text-[#9E5A64]",
						children: [
							/* @__PURE__ */ jsx("span", { className: "w-14 h-px bg-[#E8E2D8]" }),
							/* @__PURE__ */ jsx("span", {
								className: "font-serif-body italic text-4xl md:text-5xl leading-none",
								children: "&"
							}),
							/* @__PURE__ */ jsx("span", { className: "w-14 h-px bg-[#E8E2D8]" })
						]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "mb-1 w-full flex flex-col items-center gap-2",
						children: [/* @__PURE__ */ jsx("h1", {
							className: "font-serif-title text-5xl md:text-7xl text-[#2A2523] tracking-tight font-normal leading-[1.1]",
							children: weddingConfig.bride
						}), /* @__PURE__ */ jsx("p", {
							className: "text-[11px] md:text-xs tracking-[0.18em] uppercase text-[#8A827B] font-medium",
							children: weddingConfig.brideParents
						})]
					}),
					/* @__PURE__ */ jsx("p", {
						className: "text-[11px] tracking-[0.24em] uppercase text-[#8A827B] mt-8 mb-6 font-medium",
						children: "Nikah Ceremony"
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "w-full max-w-md bg-white/70 border border-[#E8E2D8] rounded-2xl px-6 py-7 md:px-8 md:py-8 flex items-center justify-between mx-auto",
						children: [
							/* @__PURE__ */ jsxs("div", {
								className: "flex-1 border-r border-[#E8E2D8] pr-4",
								children: [/* @__PURE__ */ jsx("p", {
									className: "text-[10px] tracking-[0.2em] uppercase text-[#8A827B] font-medium",
									children: weddingConfig.weddingDayName
								}), /* @__PURE__ */ jsx("p", {
									className: "text-xs text-[#2A2523] font-semibold mt-1.5",
									children: weddingConfig.weddingDateDisplay
								})]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "flex-1 px-4 flex flex-col items-center gap-1.5",
								children: [/* @__PURE__ */ jsx("p", {
									className: "font-serif-title text-4xl md:text-5xl text-[#4A6B53] font-normal leading-none",
									children: "14"
								}), /* @__PURE__ */ jsx("p", {
									className: "text-[10px] text-[#8A827B] italic tracking-wide",
									children: weddingConfig.hijriDate
								})]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "flex-1 border-l border-[#E8E2D8] pl-4",
								children: [/* @__PURE__ */ jsx("p", {
									className: "text-[10px] tracking-[0.2em] uppercase text-[#8A827B] font-medium",
									children: "Time"
								}), /* @__PURE__ */ jsx("p", {
									className: "text-xs text-[#2A2523] font-semibold mt-1.5",
									children: weddingConfig.ceremonyTime
								})]
							})
						]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "flex flex-col items-center gap-2 mt-8",
						children: [/* @__PURE__ */ jsx("p", {
							className: "text-sm font-semibold tracking-[0.2em] uppercase text-[#2A2523]",
							children: weddingConfig.ceremonyVenue
						}), /* @__PURE__ */ jsxs("p", {
							className: "text-xs text-[#8A827B] flex items-center justify-center gap-1.5",
							children: [/* @__PURE__ */ jsx(MapPin, {
								size: 13,
								className: "text-[#9E5A64]",
								strokeWidth: 1.75
							}), /* @__PURE__ */ jsx("span", { children: weddingConfig.ceremonyAddress })]
						})]
					})
				]
			})
		})
	});
}
//#endregion
//#region src/components/AudioPlayer.tsx
var KEY = "wedding_music_i";
function formatTime(secs) {
	if (!secs || !Number.isFinite(secs)) return "0:00";
	const m = Math.floor(secs / 60);
	const s = Math.floor(secs % 60);
	return `${m}:${s < 10 ? "0" : ""}${s}`;
}
function AudioPlayer() {
	const [isPlaying, setIsPlaying] = useState(false);
	const [isHover, setIsHover] = useState(false);
	const [currentTime, setCurrentTime] = useState(0);
	const [duration, setDuration] = useState(0);
	const [error, setError] = useState(false);
	const [ready, setReady] = useState(false);
	const [trackTitle, setTrackTitle] = useState("Wedding");
	const audioRef = useRef(null);
	const indexRef = useRef(0);
	const skipRef = useRef(() => {});
	useEffect(() => {
		const tracks = weddingConfig.musicTracks;
		if (!tracks.length) return;
		const last = Number(sessionStorage.getItem(KEY));
		indexRef.current = tracks.length > 1 && Number.isFinite(last) ? (last + 1) % tracks.length : Math.floor(Math.random() * tracks.length);
		sessionStorage.setItem(KEY, String(indexRef.current));
		setTrackTitle(tracks[indexRef.current].title);
		const audio = new Audio(tracks[indexRef.current].url);
		audio.loop = false;
		audio.preload = "auto";
		audio.volume = .4;
		audioRef.current = audio;
		const loadTrack = async (i, autoplay) => {
			indexRef.current = (i % tracks.length + tracks.length) % tracks.length;
			sessionStorage.setItem(KEY, String(indexRef.current));
			const track = tracks[indexRef.current];
			setTrackTitle(track.title);
			setCurrentTime(0);
			setDuration(0);
			setError(false);
			audio.src = track.url;
			audio.load();
			if (autoplay) try {
				await audio.play();
				setIsPlaying(true);
			} catch {
				setIsPlaying(false);
			}
		};
		skipRef.current = (dir) => {
			loadTrack(indexRef.current + dir, true);
		};
		const onError = () => setError(true);
		const onTime = () => {
			setCurrentTime(audio.currentTime || 0);
			if (audio.duration && Number.isFinite(audio.duration)) setDuration(audio.duration);
		};
		const onEnded = () => {
			loadTrack(indexRef.current + 1, true);
		};
		audio.addEventListener("error", onError);
		audio.addEventListener("timeupdate", onTime);
		audio.addEventListener("loadedmetadata", onTime);
		audio.addEventListener("ended", onEnded);
		const playFromGate = async () => {
			if (!audioRef.current) return;
			try {
				await audioRef.current.play();
				setIsPlaying(true);
			} catch {}
		};
		window.addEventListener("wedding:open", playFromGate);
		setReady(true);
		return () => {
			window.removeEventListener("wedding:open", playFromGate);
			audio.removeEventListener("error", onError);
			audio.removeEventListener("timeupdate", onTime);
			audio.removeEventListener("loadedmetadata", onTime);
			audio.removeEventListener("ended", onEnded);
			audio.pause();
			audio.src = "";
			audioRef.current = null;
		};
	}, []);
	const togglePlay = async () => {
		const audio = audioRef.current;
		if (!audio || error) return;
		if (isPlaying) {
			audio.pause();
			setIsPlaying(false);
			return;
		}
		try {
			await audio.play();
			setIsPlaying(true);
		} catch {}
	};
	const multi = weddingConfig.musicTracks.length > 1;
	const progress = duration > 0 ? Math.min(100, currentTime / duration * 100) : 0;
	const expanded = isHover || isPlaying;
	if (!ready) return null;
	return /* @__PURE__ */ jsxs("div", {
		className: "fixed z-50 bottom-[max(1.125rem,env(safe-area-inset-bottom))] right-3 md:bottom-5 md:right-5",
		onMouseEnter: () => setIsHover(true),
		onMouseLeave: () => setIsHover(false),
		children: [/* @__PURE__ */ jsx("button", {
			id: "audio-toggle-btn-mobile",
			onClick: togglePlay,
			disabled: error,
			"aria-label": isPlaying ? "Pause music" : "Play wedding music",
			className: `md:hidden w-8 h-8 rounded-full border backdrop-blur-md shadow-[0_4px_14px_rgba(42,37,35,0.08)] flex items-center justify-center disabled:opacity-40 ${isPlaying ? "bg-[#4A6B53]/95 border-[#4A6B53] text-white" : "bg-white/80 border-[#E8E2D8]/80 text-[#9E5A64]"}`,
			children: isPlaying ? /* @__PURE__ */ jsx("span", {
				className: "flex items-end gap-[1.5px] h-2.5",
				children: [
					4,
					7,
					5,
					8,
					4
				].map((h, i) => /* @__PURE__ */ jsx("span", {
					className: "sound-bar-elem",
					style: {
						height: h,
						animationDelay: `${i * .1}s`,
						backgroundColor: "#FFFFFF"
					}
				}, i))
			}) : /* @__PURE__ */ jsx(Music2, {
				size: 12,
				strokeWidth: 1.75
			})
		}), /* @__PURE__ */ jsxs(motion.div, {
			layout: true,
			className: `hidden md:flex items-center border border-[#E8E2D8]/90 bg-white/90 backdrop-blur-md shadow-[0_8px_28px_rgba(42,37,35,0.08)] overflow-hidden ${expanded ? "rounded-2xl pl-1.5 pr-3.5 py-1.5 gap-3" : "rounded-full"}`,
			transition: {
				duration: .28,
				ease: [
					.22,
					1,
					.36,
					1
				]
			},
			children: [/* @__PURE__ */ jsx("button", {
				id: "audio-toggle-btn",
				onClick: togglePlay,
				disabled: error,
				"aria-label": isPlaying ? "Pause music" : "Play wedding music",
				title: error ? "Music failed to load" : void 0,
				className: `shrink-0 flex items-center justify-center cursor-pointer disabled:opacity-40 transition-colors duration-300 ${expanded ? "w-9 h-9 rounded-xl bg-[#4A6B53] text-white hover:bg-[#3D5A44]" : "w-11 h-11 rounded-full text-[#9E5A64] hover:bg-[#F7ECED]/80"}`,
				children: /* @__PURE__ */ jsx(AnimatePresence, {
					mode: "wait",
					children: isPlaying ? /* @__PURE__ */ jsx(motion.div, {
						initial: {
							opacity: 0,
							scale: .85
						},
						animate: {
							opacity: 1,
							scale: 1
						},
						exit: {
							opacity: 0,
							scale: .85
						},
						transition: { duration: .18 },
						className: "flex items-end gap-[2.5px] h-3.5",
						children: [
							6,
							11,
							8,
							13,
							7
						].map((h, i) => /* @__PURE__ */ jsx("span", {
							className: "sound-bar-elem",
							style: {
								height: h,
								animationDelay: `${i * .1}s`,
								backgroundColor: "#FFFFFF"
							}
						}, i))
					}, "waves") : /* @__PURE__ */ jsx(motion.div, {
						initial: { opacity: 0 },
						animate: { opacity: 1 },
						exit: { opacity: 0 },
						children: /* @__PURE__ */ jsx(Music2, {
							size: 15,
							strokeWidth: 1.75
						})
					}, "icon")
				})
			}), /* @__PURE__ */ jsx(AnimatePresence, { children: expanded && /* @__PURE__ */ jsxs(motion.div, {
				initial: {
					width: 0,
					opacity: 0
				},
				animate: {
					width: "auto",
					opacity: 1
				},
				exit: {
					width: 0,
					opacity: 0
				},
				transition: {
					duration: .28,
					ease: [
						.22,
						1,
						.36,
						1
					]
				},
				className: "flex flex-col gap-1.5 overflow-hidden min-w-[8.25rem] max-w-[11rem]",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "flex items-center justify-between gap-2",
					children: [/* @__PURE__ */ jsx("span", {
						className: "text-[10px] tracking-[0.12em] uppercase font-medium text-[#8A827B] truncate",
						children: error ? "Unavailable" : trackTitle
					}), !error && /* @__PURE__ */ jsx("span", {
						className: "text-[10px] tabular-nums text-[#8A827B] shrink-0",
						children: formatTime(currentTime)
					})]
				}), /* @__PURE__ */ jsxs("div", {
					className: "flex items-center gap-1.5",
					children: [/* @__PURE__ */ jsx("div", {
						className: "relative flex-1 h-1 rounded-full bg-[#E8E2D8] overflow-hidden",
						children: /* @__PURE__ */ jsx("div", {
							className: "absolute inset-y-0 left-0 rounded-full bg-[#9E5A64] transition-[width] duration-200 ease-out",
							style: { width: `${error ? 0 : progress}%` }
						})
					}), multi && /* @__PURE__ */ jsxs("div", {
						className: "flex items-center gap-0.5 shrink-0 -mr-0.5",
						children: [/* @__PURE__ */ jsx("button", {
							type: "button",
							"aria-label": "Previous track",
							onClick: () => skipRef.current(-1),
							disabled: error,
							className: "w-4 h-4 rounded-full flex items-center justify-center text-[#8A827B] hover:text-[#4A6B53] transition-colors cursor-pointer disabled:opacity-30",
							children: /* @__PURE__ */ jsx(ChevronLeft, {
								size: 11,
								strokeWidth: 2.5
							})
						}), /* @__PURE__ */ jsx("button", {
							type: "button",
							"aria-label": "Next track",
							onClick: () => skipRef.current(1),
							disabled: error,
							className: "w-4 h-4 rounded-full flex items-center justify-center text-[#8A827B] hover:text-[#4A6B53] transition-colors cursor-pointer disabled:opacity-30",
							children: /* @__PURE__ */ jsx(ChevronRight, {
								size: 11,
								strokeWidth: 2.5
							})
						})]
					})]
				})]
			}, "meta") })]
		})]
	});
}
//#endregion
//#region src/components/InvitationGate.tsx
var PULL_THRESHOLD = 32;
var MAX_PULL = 52;
var SPRING_OPEN = {
	type: "spring",
	stiffness: 260,
	damping: 24,
	mass: .75
};
var SPRING_BACK = {
	type: "spring",
	stiffness: 420,
	damping: 32,
	mass: .55
};
var EASE = [
	.22,
	1,
	.36,
	1
];
function InvitationGate({ guestName }) {
	const [open, setOpen] = useState(false);
	const [pulling, setPulling] = useState(false);
	const openedRef = useRef(false);
	const didDragRef = useRef(false);
	const pullY = useMotionValue(0);
	const stringHeight = useTransform(pullY, [0, MAX_PULL], [40, 92]);
	const sealScale = useTransform(pullY, [
		0,
		PULL_THRESHOLD,
		MAX_PULL
	], [
		1,
		.98,
		.94
	]);
	const hintOpacity = useTransform(pullY, [0, 18], [1, 0]);
	const progress = useTransform(pullY, [0, PULL_THRESHOLD], [0, 1]);
	const ringScale = useTransform(progress, [0, 1], [.96, 1.06]);
	useEffect(() => {
		if (open) {
			document.body.style.overflow = "";
			return;
		}
		document.body.style.overflow = "hidden";
		return () => {
			document.body.style.overflow = "";
		};
	}, [open]);
	const completeOpen = () => {
		if (openedRef.current) return;
		openedRef.current = true;
		setOpen(true);
		window.dispatchEvent(new CustomEvent("wedding:open"));
	};
	const snapOpen = () => {
		animate(pullY, MAX_PULL, SPRING_OPEN).then(completeOpen);
	};
	const onDragStart = () => {
		didDragRef.current = false;
		setPulling(true);
	};
	const onDrag = (_, info) => {
		if (Math.abs(info.offset.y) > 4) didDragRef.current = true;
	};
	const onDragEnd = (_, info) => {
		setPulling(false);
		if (info.offset.y >= PULL_THRESHOLD || info.velocity.y > 350) {
			snapOpen();
			return;
		}
		animate(pullY, 0, SPRING_BACK);
	};
	const onTapPull = () => {
		if (didDragRef.current) return;
		snapOpen();
	};
	return /* @__PURE__ */ jsx(AnimatePresence, { children: !open && /* @__PURE__ */ jsxs(motion.div, {
		className: "fixed inset-0 z-[70] overflow-hidden",
		initial: { opacity: 1 },
		exit: { opacity: 0 },
		transition: {
			duration: .32,
			ease: EASE
		},
		children: [
			/* @__PURE__ */ jsx(motion.div, {
				className: "absolute inset-0 bg-[#F9F7F2]/40 backdrop-blur-[5px] sm:backdrop-blur-[7px]",
				exit: { opacity: 0 },
				transition: {
					duration: .35,
					ease: EASE
				}
			}),
			/* @__PURE__ */ jsx("div", {
				className: "pointer-events-none absolute inset-0",
				style: { background: "radial-gradient(ellipse at 50% 38%, rgba(249,247,242,0.78) 0%, rgba(249,247,242,0.3) 52%, rgba(249,247,242,0.1) 100%)" }
			}),
			/* @__PURE__ */ jsx(motion.div, {
				initial: {
					opacity: 0,
					y: 10
				},
				animate: {
					opacity: 1,
					y: 0
				},
				exit: {
					opacity: 0,
					y: -10
				},
				transition: {
					duration: .32,
					ease: EASE
				},
				className: "relative z-10 h-full flex flex-col items-center justify-center px-5 sm:px-6 text-center safe-pad",
				children: /* @__PURE__ */ jsxs("div", {
					className: "w-full max-w-sm sm:max-w-md flex flex-col items-center",
					children: [
						/* @__PURE__ */ jsx("p", {
							className: "font-arabic text-[1.65rem] sm:text-3xl text-[#2A2523] mb-3 sm:mb-5 leading-loose",
							children: "بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ"
						}),
						guestName ? /* @__PURE__ */ jsxs("div", {
							className: "guest-invite-block mx-auto text-center mb-4 sm:mb-6",
							children: [/* @__PURE__ */ jsx("p", {
								className: "guest-invite-block__label",
								children: "Exclusive Invitation for"
							}), /* @__PURE__ */ jsx("p", {
								className: "guest-invite-block__name",
								children: guestName
							})]
						}) : /* @__PURE__ */ jsx("p", {
							className: "text-[10px] tracking-[0.28em] uppercase text-[#5A534E] font-medium mb-4 sm:mb-6",
							children: "You are invited"
						}),
						/* @__PURE__ */ jsx("h1", {
							className: "font-serif-title text-[1.75rem] sm:text-[2.75rem] text-[#2A2523] font-normal leading-tight mb-1.5 px-1",
							children: /* @__PURE__ */ jsxs("span", {
								className: "couple-names",
								children: [
									/* @__PURE__ */ jsx("span", {
										className: "couple-names__part whitespace-nowrap",
										children: weddingConfig.groom
									}),
									/* @__PURE__ */ jsx("span", {
										className: "couple-names__amp font-serif-body italic",
										children: "&"
									}),
									/* @__PURE__ */ jsx("span", {
										className: "couple-names__part whitespace-nowrap",
										children: weddingConfig.bride
									})
								]
							})
						}),
						/* @__PURE__ */ jsx("p", {
							className: "text-[10px] sm:text-[11px] tracking-[0.2em] uppercase text-[#5A534E] font-medium mb-8 sm:mb-10",
							children: weddingConfig.weddingDateDisplay
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "relative flex flex-col items-center select-none touch-none cursor-wedding-pull",
							children: [
								/* @__PURE__ */ jsx("div", { className: "w-8 h-1.5 rounded-full bg-[#C2A166]/70 mb-1" }),
								/* @__PURE__ */ jsx("div", { className: "w-2.5 h-2.5 rounded-full bg-[#C2A166] z-10" }),
								/* @__PURE__ */ jsxs(motion.div, {
									className: "origin-top",
									animate: pulling ? { rotate: 0 } : { rotate: [
										-1.2,
										1.2,
										-1.2
									] },
									transition: {
										duration: 3.2,
										repeat: Infinity,
										ease: "easeInOut"
									},
									children: [/* @__PURE__ */ jsx(motion.div, {
										className: "mx-auto w-[2px] bg-gradient-to-b from-[#C2A166] via-[#C2A166]/90 to-[#9E5A64]/70",
										style: { height: stringHeight }
									}), /* @__PURE__ */ jsx(motion.button, {
										type: "button",
										"aria-label": "Pull or tap to open invitation",
										drag: "y",
										dragConstraints: {
											top: 0,
											bottom: MAX_PULL
										},
										dragElastic: .06,
										dragMomentum: false,
										style: {
											y: pullY,
											scale: sealScale
										},
										onDragStart,
										onDrag,
										onDragEnd,
										onClick: onTapPull,
										className: "relative -mt-1 border-0 bg-transparent p-0 flex flex-col items-center outline-none cursor-wedding-pull touch-drag-y",
										children: /* @__PURE__ */ jsxs(motion.div, {
											animate: pulling ? { y: 0 } : { y: [
												0,
												5,
												0
											] },
											transition: {
												duration: 2.2,
												repeat: Infinity,
												ease: "easeInOut"
											},
											className: "flex flex-col items-center",
											children: [
												/* @__PURE__ */ jsx("span", { className: "w-4 h-4 rounded-full border-2 border-[#C2A166] bg-[#F9F7F2] mb-1.5" }),
												/* @__PURE__ */ jsxs("span", {
													className: "relative w-[5.5rem] h-[5.5rem] sm:w-[5rem] sm:h-[5rem] rounded-full bg-[#9E5A64] shadow-[0_12px_28px_rgba(158,90,100,0.32)] flex items-center justify-center",
													children: [
														/* @__PURE__ */ jsx("span", { className: "absolute inset-[5px] rounded-full border border-[#C2A166]/50" }),
														/* @__PURE__ */ jsx("span", {
															className: "font-serif-title text-white text-xl leading-none tracking-wide",
															children: "G&B"
														}),
														/* @__PURE__ */ jsx(motion.span, {
															className: "absolute inset-0 rounded-full border-2 border-[#C2A166]",
															style: {
																opacity: progress,
																scale: ringScale
															}
														})
													]
												}),
												/* @__PURE__ */ jsx("span", {
													className: "mt-2 flex gap-[3px]",
													children: [
														11,
														14,
														15,
														14,
														11
													].map((height, i) => /* @__PURE__ */ jsx("span", {
														className: "w-[2px] rounded-full bg-[#C2A166]",
														style: { height }
													}, i))
												})
											]
										})
									})]
								}),
								/* @__PURE__ */ jsxs(motion.div, {
									style: { opacity: hintOpacity },
									className: "mt-5 flex flex-col items-center gap-0.5 text-[#9E5A64]",
									animate: { y: [
										0,
										4,
										0
									] },
									transition: {
										duration: 1.8,
										repeat: Infinity,
										ease: "easeInOut"
									},
									children: [/* @__PURE__ */ jsx("span", {
										className: "text-base leading-none opacity-40",
										children: "↓"
									}), /* @__PURE__ */ jsx("span", {
										className: "text-base leading-none",
										children: "↓"
									})]
								}),
								/* @__PURE__ */ jsx(motion.p, {
									style: { opacity: hintOpacity },
									className: "mt-3 text-[11px] tracking-[0.22em] uppercase text-[#5A534E] font-semibold",
									children: "Swipe down or tap to open"
								})
							]
						})
					]
				})
			})
		]
	}, "gate") });
}
//#endregion
//#region src/components/CountdownTimer.tsx
var TICK_EASE = [
	.22,
	1,
	.36,
	1
];
var UNITS = [
	{
		key: "days",
		label: "Days"
	},
	{
		key: "hours",
		label: "Hours"
	},
	{
		key: "minutes",
		label: "Mins"
	},
	{
		key: "seconds",
		label: "Secs"
	}
];
function getTimeLeft() {
	const diff = weddingConfig.weddingDate.getTime() - Date.now();
	if (diff <= 0) return {
		days: 0,
		hours: 0,
		minutes: 0,
		seconds: 0
	};
	return {
		days: Math.floor(diff / 864e5),
		hours: Math.floor(diff / 36e5 % 24),
		minutes: Math.floor(diff / 6e4 % 60),
		seconds: Math.floor(diff / 1e3 % 60)
	};
}
var CountdownUnit = memo(function CountdownUnit({ value, label }) {
	const display = String(value).padStart(2, "0");
	return /* @__PURE__ */ jsxs("div", {
		className: "countdown-unit",
		children: [/* @__PURE__ */ jsx("div", {
			className: "countdown-unit__value",
			children: /* @__PURE__ */ jsx(AnimatePresence, {
				mode: "wait",
				initial: false,
				children: /* @__PURE__ */ jsx(motion.span, {
					initial: {
						y: 8,
						opacity: 0
					},
					animate: {
						y: 0,
						opacity: 1
					},
					exit: {
						y: -8,
						opacity: 0
					},
					transition: {
						duration: .36,
						ease: TICK_EASE
					},
					className: "countdown-unit__digit font-serif-title tabular-nums select-none",
					children: display
				}, display)
			})
		}), /* @__PURE__ */ jsx("span", {
			className: "countdown-unit__label",
			children: label
		})]
	});
});
function CountdownTimer() {
	const [timeLeft, setTimeLeft] = useState(getTimeLeft);
	const [mounted, setMounted] = useState(false);
	useEffect(() => {
		setMounted(true);
		setTimeLeft(getTimeLeft());
		const msToNextSecond = 1e3 - Date.now() % 1e3;
		let interval;
		const timeout = window.setTimeout(() => {
			setTimeLeft(getTimeLeft());
			interval = window.setInterval(() => setTimeLeft(getTimeLeft()), 1e3);
		}, msToNextSecond);
		return () => {
			window.clearTimeout(timeout);
			if (interval) window.clearInterval(interval);
		};
	}, []);
	return /* @__PURE__ */ jsx("section", {
		id: "countdown",
		className: "section-shell section-shell--soft",
		children: /* @__PURE__ */ jsx("div", {
			className: "section-inner max-w-2xl gap-0",
			children: /* @__PURE__ */ jsxs(motion.div, {
				initial: {
					opacity: 0,
					y: 16
				},
				whileInView: {
					opacity: 1,
					y: 0
				},
				viewport: {
					once: true,
					margin: "-40px"
				},
				transition: {
					duration: .65,
					ease: TICK_EASE
				},
				className: "w-full flex flex-col items-center",
				children: [
					/* @__PURE__ */ jsx("div", { className: "w-14 h-px bg-[#9E5A64]/35 mb-4" }),
					/* @__PURE__ */ jsx("p", {
						className: "text-[11px] tracking-[0.32em] uppercase text-[#8A827B] font-medium mb-6",
						children: "Countdown to Nikah Ceremony"
					}),
					mounted ? /* @__PURE__ */ jsx("div", {
						className: "countdown-grid",
						children: UNITS.map(({ key, label }) => /* @__PURE__ */ jsx(CountdownUnit, {
							value: timeLeft[key],
							label
						}, key))
					}) : /* @__PURE__ */ jsx("div", {
						className: "countdown-grid countdown-grid--placeholder",
						"aria-hidden": "true",
						children: UNITS.map(({ key, label }) => /* @__PURE__ */ jsxs("div", {
							className: "countdown-unit countdown-unit--placeholder",
							children: [/* @__PURE__ */ jsx("span", {
								className: "countdown-unit__digit font-serif-title",
								children: "00"
							}), /* @__PURE__ */ jsx("span", {
								className: "countdown-unit__label",
								children: label
							})]
						}, key))
					}),
					/* @__PURE__ */ jsx("div", { className: "w-14 h-px bg-[#9E5A64]/35 mt-6" })
				]
			})
		})
	});
}
//#endregion
//#region src/components/EventDetails.tsx
var fadeUp = {
	initial: {
		opacity: 0,
		y: 20
	},
	whileInView: {
		opacity: 1,
		y: 0
	},
	viewport: {
		once: true,
		margin: "-40px"
	},
	transition: {
		duration: .7,
		ease: [
			.22,
			1,
			.36,
			1
		]
	}
};
var eventDate = weddingConfig.weddingDate;
var calMonth = eventDate.toLocaleString("en-US", { month: "short" }).toUpperCase();
var calDay = eventDate.getDate();
var calYear = eventDate.getFullYear();
function EventDetails() {
	return /* @__PURE__ */ jsx("section", {
		id: "event-details",
		className: "section-shell",
		children: /* @__PURE__ */ jsxs("div", {
			className: "section-inner max-w-xl",
			children: [
				/* @__PURE__ */ jsxs(motion.div, {
					...fadeUp,
					className: "mb-7 w-full flex flex-col items-center",
					children: [
						/* @__PURE__ */ jsx("p", {
							className: "text-[11px] tracking-[0.32em] uppercase text-[#8A827B] font-medium mb-2.5",
							children: "Save the Date"
						}),
						/* @__PURE__ */ jsx("h2", {
							className: "font-serif-title text-4xl md:text-[3.25rem] text-[#2A2523] font-normal mb-2.5 tracking-tight",
							children: "Event Details"
						}),
						/* @__PURE__ */ jsx("p", {
							className: "font-serif-body text-xl md:text-2xl italic text-[#8A827B]",
							children: "Join us for a day of love & barakah"
						}),
						/* @__PURE__ */ jsx("div", { className: "w-14 h-px bg-[#E8E2D8] mx-auto mt-5" })
					]
				}),
				/* @__PURE__ */ jsxs(motion.div, {
					...fadeUp,
					transition: {
						...fadeUp.transition,
						delay: .08
					},
					className: "surface-card w-full overflow-hidden mb-4",
					children: [
						/* @__PURE__ */ jsxs("div", {
							className: "px-6 pt-7 pb-5 md:px-8 md:pt-8 border-b border-[#E8E2D8]/80",
							children: [
								/* @__PURE__ */ jsxs("div", {
									className: "flex items-center gap-2 mb-4",
									children: [/* @__PURE__ */ jsxs("span", {
										className: "inline-flex items-center gap-1.5 text-[10px] tracking-[0.22em] uppercase font-semibold text-[#4A6B53] bg-[#EBF2EC] px-3 py-1.5 rounded-full",
										children: [/* @__PURE__ */ jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-[#4A6B53]" }), "Nikah Ceremony"]
									}), /* @__PURE__ */ jsx("span", {
										className: "text-[10px] tracking-[0.15em] uppercase text-[#8A827B]",
										children: weddingConfig.weddingDayName
									})]
								}),
								/* @__PURE__ */ jsx("h3", {
									className: "font-serif-title text-[1.85rem] md:text-[2.35rem] text-[#2A2523] font-normal tracking-tight leading-tight mb-5",
									children: weddingConfig.ceremonyVenue
								}),
								/* @__PURE__ */ jsx("div", {
									className: "rounded-2xl bg-[#EBF2EC]/70 border border-[#4A6B53]/20 px-4 py-4 md:px-5 md:py-5",
									children: /* @__PURE__ */ jsxs("div", {
										className: "flex gap-3.5 items-center justify-center",
										children: [/* @__PURE__ */ jsx("span", {
											className: "shrink-0 w-10 h-10 rounded-xl bg-[#4A6B53] text-white flex items-center justify-center shadow-[0_6px_16px_rgba(74,107,83,0.25)]",
											children: /* @__PURE__ */ jsx(MapPin, {
												size: 18,
												strokeWidth: 2
											})
										}), /* @__PURE__ */ jsx("div", {
											className: "min-w-0 pt-0.5",
											children: /* @__PURE__ */ jsx("p", {
												className: "text-base md:text-lg font-semibold text-[#2A2523] leading-snug",
												children: weddingConfig.ceremonyAddress
											})
										})]
									})
								})
							]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "px-6 py-4 md:px-8 flex items-center justify-between gap-4 bg-[#FDFCF8]",
							children: [/* @__PURE__ */ jsx("div", {
								className: "flex items-center gap-2.5 min-w-0",
								children: /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
									className: "text-[10px] tracking-[0.18em] text-left uppercase text-[#8A827B] font-medium",
									children: "Time"
								}), /* @__PURE__ */ jsx("p", {
									className: "text-sm font-semibold text-[#2A2523]",
									children: weddingConfig.ceremonyTime
								})] })
							}), /* @__PURE__ */ jsxs("div", {
								className: "text-right shrink-0",
								children: [/* @__PURE__ */ jsx("p", {
									className: "text-[10px] tracking-[0.18em] uppercase text-[#8A827B] font-medium",
									children: "Date"
								}), /* @__PURE__ */ jsx("p", {
									className: "text-sm font-semibold text-[#2A2523]",
									children: weddingConfig.weddingDateDisplay
								})]
							})]
						}),
						/* @__PURE__ */ jsxs("a", {
							href: weddingConfig.ceremonyMapUrl,
							target: "_blank",
							rel: "noopener noreferrer",
							className: "flex items-center justify-center gap-2.5 w-full px-6 py-4 bg-[#4A6B53] text-white text-[11px] tracking-[0.2em] uppercase font-semibold transition-colors duration-300 hover:bg-[#3D5A44] group",
							children: [
								/* @__PURE__ */ jsx(Navigation, {
									size: 15,
									strokeWidth: 2,
									className: "opacity-90"
								}),
								/* @__PURE__ */ jsx("span", { children: "Open in Google Maps" }),
								/* @__PURE__ */ jsx(ArrowUpRight, {
									size: 14,
									className: "opacity-80 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
								})
							]
						})
					]
				}),
				/* @__PURE__ */ jsx(motion.div, {
					...fadeUp,
					transition: {
						...fadeUp.transition,
						delay: .14
					},
					children: /* @__PURE__ */ jsxs("a", {
						id: "add-to-google-calendar-btn",
						href: weddingConfig.googleCalendarUrl,
						target: "_blank",
						rel: "noopener noreferrer",
						className: "group flex items-center gap-3.5 w-full overflow-hidden rounded-2xl bg-gradient-to-r from-[#4A6B53] to-[#3D5A44] text-white px-4 py-3.5 shadow-[0_12px_32px_rgba(74,107,83,0.32)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_40px_rgba(74,107,83,0.4)]",
						children: [
							/* @__PURE__ */ jsxs("div", {
								className: "shrink-0 w-[3.25rem] rounded-xl bg-white/15 border border-white/20 flex flex-col items-center justify-center py-2",
								children: [
									/* @__PURE__ */ jsx("span", {
										className: "text-[9px] tracking-wider uppercase text-white/75 font-semibold leading-none",
										children: calMonth
									}),
									/* @__PURE__ */ jsx("span", {
										className: "font-serif-title text-2xl text-white leading-none my-0.5",
										children: calDay
									}),
									/* @__PURE__ */ jsx("span", {
										className: "text-[9px] text-white/65 leading-none",
										children: calYear
									})
								]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "flex-1 min-w-0",
								children: [
									/* @__PURE__ */ jsx("p", {
										className: "text-[10px] tracking-[0.2em] uppercase text-white/70 font-medium mb-0.5",
										children: "Save the date"
									}),
									/* @__PURE__ */ jsx("p", {
										className: "font-serif-title text-base text-white leading-tight truncate",
										children: weddingConfig.weddingDateDisplay
									}),
									/* @__PURE__ */ jsxs("p", {
										className: "text-[11px] text-white/75 mt-0.5",
										children: [weddingConfig.ceremonyTime, " · Add to Calendar"]
									})
								]
							}),
							/* @__PURE__ */ jsx("span", {
								className: "shrink-0 w-9 h-9 rounded-xl bg-white/15 text-white flex items-center justify-center transition-colors duration-300 group-hover:bg-white group-hover:text-[#4A6B53]",
								children: /* @__PURE__ */ jsx(CalendarHeart, {
									size: 17,
									strokeWidth: 1.75
								})
							})
						]
					})
				})
			]
		})
	});
}
//#endregion
//#region src/components/RsvpSection.tsx
var ANON_KEY = "wedding_anon_id";
var RSVP_KEY = "wedding_rsvp";
function clearLocalRsvp() {
	localStorage.removeItem(ANON_KEY);
	localStorage.removeItem(RSVP_KEY);
}
function ensureAnonId() {
	let id = localStorage.getItem(ANON_KEY);
	if (!id) {
		id = crypto.randomUUID().replace(/-/g, "").slice(0, 8);
		localStorage.setItem(ANON_KEY, id);
	}
	return id;
}
function loadSavedRsvp() {
	try {
		const raw = localStorage.getItem(RSVP_KEY);
		if (!raw) return null;
		const data = JSON.parse(raw);
		if (data.status === "yes" || data.status === "no") return {
			status: data.status,
			count: Number(data.count) || 1
		};
	} catch {}
	return null;
}
function saveRsvp(status, count) {
	localStorage.setItem(RSVP_KEY, JSON.stringify({
		status,
		count
	}));
}
function launchSVGPetalConfetti() {
	const count = typeof window !== "undefined" && window.matchMedia("(max-width: 767px)").matches ? 16 : 36;
	for (let i = 0; i < count; i++) {
		const wrapper = document.createElement("div");
		wrapper.className = "petal-element";
		wrapper.style.left = `${Math.min(96, Math.max(2, Math.random() * 98))}%`;
		wrapper.style.animationDuration = `${5 + Math.random() * 5}s`;
		wrapper.style.animationDelay = `${Math.random() * 1.2}s`;
		if (i % 3 === 0) wrapper.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M12 21.35L10.55 20.03C5.4 15.36 2 12.27 2 8.5C2 5.41 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.08C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.41 22 8.5C22 12.27 18.6 15.36 13.45 20.03L12 21.35Z" fill="#F7C5CC" fill-opacity="0.9"/></svg>`;
		else wrapper.innerHTML = `<svg width="18" height="22" viewBox="0 0 20 24" fill="none"><path d="M10 0C16 4 20 10 20 16C20 20.4 15.5 24 10 24C4.5 24 0 20.4 0 16C0 10 4 4 10 0Z" fill="#F4B8C3" fill-opacity="0.85"/></svg>`;
		document.body.appendChild(wrapper);
		setTimeout(() => {
			if (wrapper.parentNode) wrapper.parentNode.removeChild(wrapper);
		}, 7500);
	}
}
var cardEase = [
	.22,
	1,
	.36,
	1
];
function RsvpSection({ guestId, guestName, initialStatus, initialCount = 1 }) {
	const [phase, setPhase] = useState("question");
	const [guestCount, setGuestCount] = useState(initialCount > 0 ? initialCount : 1);
	const [submitting, setSubmitting] = useState(false);
	const anonRef = useRef("");
	useEffect(() => {
		if (guestId) {
			if (initialStatus === "yes") {
				setGuestCount(initialCount > 0 ? initialCount : 1);
				setPhase("confirmed");
			} else if (initialStatus === "no") setPhase("declined");
			return;
		}
		const saved = loadSavedRsvp();
		if (saved) {
			anonRef.current = localStorage.getItem(ANON_KEY) || "";
			setGuestCount(saved.count);
			setPhase(saved.status === "yes" ? "confirmed" : "declined");
		}
	}, [
		guestId,
		initialStatus,
		initialCount
	]);
	const postRsvp = async (attending, count = 1) => {
		const body = {
			attending,
			guestCount: count
		};
		if (guestId) body.guestId = guestId;
		else {
			const id = ensureAnonId();
			anonRef.current = id;
			body.anonymousId = id;
		}
		await fetch("/api/rsvp", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(body)
		});
		if (!guestId) saveRsvp(attending ? "yes" : "no", attending ? count : 0);
	};
	const clearUnknownRsvp = async () => {
		if (guestId) return;
		const id = localStorage.getItem(ANON_KEY);
		if (id) try {
			await fetch("/api/rsvp", {
				method: "DELETE",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ anonymousId: id })
			});
		} catch {}
		clearLocalRsvp();
		anonRef.current = "";
	};
	const handleChangeResponse = async () => {
		await clearUnknownRsvp();
		setPhase("question");
		setGuestCount(1);
	};
	const decrement = () => setGuestCount((c) => Math.max(1, c - 1));
	const increment = () => setGuestCount((c) => Math.min(25, c + 1));
	const handleClickAttend = () => setPhase("count-picker");
	const handleSubmitCount = async () => {
		setSubmitting(true);
		try {
			await postRsvp(true, guestCount);
		} catch {}
		setPhase("confirmed");
		launchSVGPetalConfetti();
		setSubmitting(false);
	};
	const handleDecline = async () => {
		setPhase("loading-decline");
		try {
			await postRsvp(false);
		} catch {}
		setPhase("declined");
	};
	return /* @__PURE__ */ jsx("section", {
		id: "rsvp",
		className: "section-shell section-shell--soft",
		children: /* @__PURE__ */ jsxs("div", {
			className: "section-inner max-w-xl",
			children: [/* @__PURE__ */ jsxs(motion.div, {
				initial: {
					opacity: 0,
					y: 18
				},
				whileInView: {
					opacity: 1,
					y: 0
				},
				viewport: {
					once: true,
					margin: "-40px"
				},
				transition: {
					duration: .7,
					ease: cardEase
				},
				className: "mb-7 w-full flex flex-col items-center",
				children: [
					/* @__PURE__ */ jsx("p", {
						className: "text-[11px] tracking-[0.32em] uppercase text-[#8A827B] font-medium mb-2.5",
						children: "R S V P"
					}),
					/* @__PURE__ */ jsx("h2", {
						className: "font-serif-title text-4xl md:text-[3.25rem] text-[#2A2523] font-normal mb-2.5 tracking-tight",
						children: "Will You Attend?"
					}),
					guestName ? /* @__PURE__ */ jsxs("p", {
						className: "font-guest-name text-xl md:text-2xl text-[#9E5A64]",
						children: ["Dear ", guestName]
					}) : /* @__PURE__ */ jsxs("p", {
						className: "font-serif-body text-xl italic text-[#8A827B]",
						children: ["Kindly respond by ", weddingConfig.rsvpDeadline]
					})
				]
			}), /* @__PURE__ */ jsx("div", {
				className: "w-full max-w-md mx-auto",
				children: /* @__PURE__ */ jsxs(AnimatePresence, {
					mode: "wait",
					children: [
						phase === "question" && /* @__PURE__ */ jsxs(motion.div, {
							initial: {
								opacity: 0,
								y: 16
							},
							animate: {
								opacity: 1,
								y: 0
							},
							exit: {
								opacity: 0,
								y: -12
							},
							transition: {
								duration: .4,
								ease: cardEase
							},
							className: "surface-card w-full px-6 py-8 md:px-9 md:py-10 flex flex-col gap-4",
							children: [
								/* @__PURE__ */ jsxs("button", {
									id: "rsvp-attend-btn",
									onClick: handleClickAttend,
									className: "group relative w-full overflow-hidden rounded-full bg-gradient-to-r from-[#4A6B53] to-[#5A7D62] text-white py-[1.05rem] px-6 text-sm font-medium tracking-wide shadow-[0_12px_32px_rgba(74,107,83,0.22)] transition-all duration-300 hover:shadow-[0_16px_36px_rgba(74,107,83,0.28)] hover:-translate-y-0.5 cursor-pointer",
									children: [/* @__PURE__ */ jsxs("span", {
										className: "relative z-10 flex items-center justify-center gap-2.5",
										children: [/* @__PURE__ */ jsx("span", {
											className: "text-base leading-none",
											children: "✓"
										}), /* @__PURE__ */ jsx("span", { children: "Yes, In Sha Allah" })]
									}), /* @__PURE__ */ jsx("span", { className: "absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors duration-300" })]
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "flex items-center gap-3 px-1",
									children: [
										/* @__PURE__ */ jsx("span", { className: "h-px flex-1 bg-[#E8E2D8]" }),
										/* @__PURE__ */ jsx("span", {
											className: "text-[10px] tracking-[0.2em] uppercase text-[#8A827B]",
											children: "or"
										}),
										/* @__PURE__ */ jsx("span", { className: "h-px flex-1 bg-[#E8E2D8]" })
									]
								}),
								/* @__PURE__ */ jsx("button", {
									id: "rsvp-decline-btn",
									onClick: handleDecline,
									className: "w-full rounded-full border border-[#E8E2D8] bg-white/70 text-[#8A827B] py-[0.95rem] px-6 text-sm font-medium tracking-wide transition-all duration-300 hover:border-[#9E5A64]/35 hover:text-[#9E5A64] hover:bg-[#FDF8F9] cursor-pointer",
									children: "Unfortunately, I can't make it"
								})
							]
						}, "question"),
						phase === "loading-decline" && /* @__PURE__ */ jsx(motion.div, {
							initial: { opacity: 0 },
							animate: { opacity: 1 },
							exit: { opacity: 0 },
							className: "surface-card w-full p-14 flex items-center justify-center",
							children: /* @__PURE__ */ jsx(Loader2, {
								size: 24,
								className: "animate-spin text-[#9E5A64]"
							})
						}, "loading-decline"),
						phase === "count-picker" && /* @__PURE__ */ jsxs(motion.div, {
							initial: {
								opacity: 0,
								y: 16
							},
							animate: {
								opacity: 1,
								y: 0
							},
							exit: {
								opacity: 0,
								y: -12
							},
							transition: {
								type: "spring",
								stiffness: 280,
								damping: 28
							},
							className: "surface-card w-full px-7 py-9 md:px-10 md:py-11 flex flex-col items-center",
							children: [
								/* @__PURE__ */ jsx("p", {
									className: "font-serif-title text-3xl text-[#2A2523] mb-2",
									children: "Wonderful!"
								}),
								guestName && /* @__PURE__ */ jsxs("p", {
									className: "text-[10px] tracking-[0.25em] uppercase text-[#4A6B53] font-semibold mb-7",
									children: ["Details for ", guestName]
								}),
								!guestName && /* @__PURE__ */ jsx("div", { className: "mb-7" }),
								/* @__PURE__ */ jsx("p", {
									className: "font-serif-body text-xl italic text-[#5A534E] mb-8",
									children: "How many family members will attend?"
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "bg-[#FDFCF8] border border-[#E8E2D8] rounded-2xl px-6 py-7 mb-7 flex flex-col items-center w-full",
									children: [/* @__PURE__ */ jsxs("div", {
										className: "flex items-center justify-center gap-7",
										children: [
											/* @__PURE__ */ jsx("button", {
												id: "rsvp-decrement-btn",
												onClick: decrement,
												disabled: guestCount <= 1,
												className: "w-11 h-11 rounded-full bg-white border border-[#E8E2D8] text-[#2A2523] flex items-center justify-center disabled:opacity-30 hover:border-[#4A6B53] transition-all duration-300 cursor-pointer",
												children: /* @__PURE__ */ jsx(Minus, { size: 18 })
											}),
											/* @__PURE__ */ jsx("span", {
												className: "font-serif-title text-4xl text-[#2A2523] w-14 text-center select-none font-normal",
												children: guestCount
											}),
											/* @__PURE__ */ jsx("button", {
												id: "rsvp-increment-btn",
												onClick: increment,
												disabled: guestCount >= 25,
												className: "w-11 h-11 rounded-full bg-white border border-[#E8E2D8] text-[#2A2523] flex items-center justify-center disabled:opacity-30 hover:border-[#4A6B53] transition-all duration-300 cursor-pointer",
												children: /* @__PURE__ */ jsx(Plus, { size: 18 })
											})
										]
									}), /* @__PURE__ */ jsx("span", {
										className: "text-[10px] tracking-[0.2em] uppercase text-[#8A827B] mt-5 font-medium",
										children: "Including yourself"
									})]
								}),
								/* @__PURE__ */ jsxs("button", {
									id: "rsvp-submit-count-btn",
									onClick: handleSubmitCount,
									disabled: submitting,
									className: "w-full bg-[#4A6B53] hover:bg-[#3D5A44] text-white text-[11px] tracking-[0.2em] uppercase font-semibold py-4 px-6 rounded-2xl transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer hover:-translate-y-0.5 shadow-[0_10px_28px_rgba(74,107,83,0.2)]",
									children: [submitting ? /* @__PURE__ */ jsx(Loader2, {
										size: 16,
										className: "animate-spin"
									}) : null, /* @__PURE__ */ jsx("span", { children: "Submit RSVP" })]
								})
							]
						}, "count-picker"),
						phase === "confirmed" && /* @__PURE__ */ jsxs(motion.div, {
							initial: {
								opacity: 0,
								y: 16
							},
							animate: {
								opacity: 1,
								y: 0
							},
							transition: {
								type: "spring",
								stiffness: 260,
								damping: 26
							},
							className: "surface-card w-full px-8 py-11 flex flex-col items-center",
							children: [
								/* @__PURE__ */ jsx("div", {
									className: "w-14 h-14 rounded-2xl bg-[#EBF2EC] text-[#4A6B53] flex items-center justify-center mx-auto mb-6 text-2xl",
									children: "✓"
								}),
								/* @__PURE__ */ jsx("h3", {
									className: "font-serif-title text-3xl md:text-4xl text-[#2A2523] mb-4",
									children: "JazakAllah Khair!"
								}),
								/* @__PURE__ */ jsxs("p", {
									className: "font-serif-body text-lg md:text-xl italic text-[#5A534E] leading-relaxed mb-8",
									children: [
										"We look forward to celebrating with you.",
										/* @__PURE__ */ jsx("br", {}),
										"See you on the 14th, Insha Allah!"
									]
								}),
								/* @__PURE__ */ jsx("div", {
									className: "bg-[#EBF2EC] border border-[#4A6B53]/20 rounded-2xl py-4 px-6 mb-7 w-full",
									children: /* @__PURE__ */ jsxs("p", {
										className: "text-xs tracking-[0.2em] uppercase font-semibold text-[#4A6B53]",
										children: [
											guestCount,
											" ",
											guestCount === 1 ? "Guest" : "Guests",
											" Confirmed"
										]
									})
								}),
								/* @__PURE__ */ jsx("button", {
									onClick: handleChangeResponse,
									className: "text-[10px] tracking-[0.2em] uppercase font-medium text-[#8A827B] hover:text-[#2A2523] underline underline-offset-4 cursor-pointer transition-colors",
									children: "Change response"
								})
							]
						}, "confirmed"),
						phase === "declined" && /* @__PURE__ */ jsxs(motion.div, {
							initial: {
								opacity: 0,
								y: 16
							},
							animate: {
								opacity: 1,
								y: 0
							},
							transition: {
								type: "spring",
								stiffness: 260,
								damping: 26
							},
							className: "surface-card w-full px-8 py-11 flex flex-col items-center",
							children: [
								/* @__PURE__ */ jsx("div", {
									className: "w-14 h-14 rounded-2xl bg-[#F7ECED] text-[#9E5A64] flex items-center justify-center mx-auto mb-6 text-2xl",
									children: "♡"
								}),
								/* @__PURE__ */ jsx("h3", {
									className: "font-serif-title text-3xl md:text-4xl text-[#2A2523] mb-4",
									children: "You Will Be Missed"
								}),
								/* @__PURE__ */ jsx("p", {
									className: "font-serif-body text-lg md:text-xl italic text-[#5A534E] leading-relaxed mb-8",
									children: "We understand you can't make it. Thank you for letting us know. You will be in our duas on this blessed day, and we kindly ask that you keep us in yours as we begin this new journey."
								}),
								/* @__PURE__ */ jsx("button", {
									onClick: handleChangeResponse,
									className: "text-[10px] tracking-[0.2em] uppercase font-medium text-[#8A827B] hover:text-[#2A2523] underline underline-offset-4 cursor-pointer transition-colors",
									children: "Change response"
								})
							]
						}, "declined")
					]
				})
			})]
		})
	});
}
//#endregion
//#region src/components/Footer.tsx
function Footer() {
	return /* @__PURE__ */ jsx("footer", {
		className: "section-shell border-t border-[#E8E2D8]/70",
		children: /* @__PURE__ */ jsx("div", {
			className: "section-inner max-w-lg",
			children: /* @__PURE__ */ jsxs(motion.div, {
				initial: {
					opacity: 0,
					y: 16
				},
				whileInView: {
					opacity: 1,
					y: 0
				},
				viewport: {
					once: true,
					margin: "-40px"
				},
				transition: {
					duration: .7,
					ease: [
						.22,
						1,
						.36,
						1
					]
				},
				className: "flex flex-col items-center gap-5 w-full",
				children: [
					/* @__PURE__ */ jsx("h2", {
						className: "font-serif-title text-4xl md:text-5xl text-[#2A2523] font-normal tracking-tight",
						children: /* @__PURE__ */ jsxs("span", {
							className: "couple-names",
							children: [
								/* @__PURE__ */ jsx("span", {
									className: "couple-names__part whitespace-nowrap",
									children: weddingConfig.groom
								}),
								/* @__PURE__ */ jsx("span", {
									className: "couple-names__amp font-serif-body italic",
									children: "&"
								}),
								/* @__PURE__ */ jsx("span", {
									className: "couple-names__part whitespace-nowrap",
									children: weddingConfig.bride
								})
							]
						})
					}),
					/* @__PURE__ */ jsx("p", {
						className: "text-[11px] tracking-[0.28em] uppercase text-[#8A827B] font-medium",
						children: weddingConfig.weddingDateDisplay
					}),
					/* @__PURE__ */ jsx("p", {
						className: "font-serif-body text-xl md:text-2xl italic text-[#8A827B] mt-1",
						children: "\"Two souls, one heart, forever insha Allah.\""
					}),
					/* @__PURE__ */ jsx("div", { className: "w-12 h-px bg-[#E8E2D8] my-3" }),
					/* @__PURE__ */ jsxs("div", {
						className: "flex items-center justify-center gap-1.5 text-[#8A827B] text-xs",
						children: [
							/* @__PURE__ */ jsx("span", { children: "Made with" }),
							/* @__PURE__ */ jsx(Heart, {
								size: 11,
								className: "text-[#9E5A64]",
								fill: "currentColor"
							}),
							/* @__PURE__ */ jsx("span", { children: "for the happiest day" })
						]
					})
				]
			})
		})
	});
}
//#endregion
//#region src/components/FallingPetals.tsx
var HEART = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M12 21.35L10.55 20.03C5.4 15.36 2 12.27 2 8.5C2 5.41 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.08C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.41 22 8.5C22 12.27 18.6 15.36 13.45 20.03L12 21.35Z" fill="#F7C5CC" fill-opacity="0.85"/></svg>`;
var PETAL_A = `<svg width="18" height="22" viewBox="0 0 20 24" fill="none"><path d="M10 0C16 4 20 10 20 16C20 20.4 15.5 24 10 24C4.5 24 0 20.4 0 16C0 10 4 4 10 0Z" fill="#F4B8C3" fill-opacity="0.75"/></svg>`;
var PETAL_B = `<svg width="16" height="20" viewBox="0 0 18 22" fill="none"><path d="M9 0C14.5 3.5 18 9 18 14.5C18 18.5 14 22 9 22C4 22 0 18.5 0 14.5C0 9 3.5 3.5 9 0Z" fill="#E8A2AF" fill-opacity="0.8"/></svg>`;
function FallingPetals() {
	const containerRef = useRef(null);
	useEffect(() => {
		const container = containerRef.current;
		if (!container) return;
		const count = window.matchMedia("(max-width: 767px)").matches ? 7 : 22;
		for (let i = 0; i < count; i++) {
			const el = document.createElement("div");
			el.className = "petal-element";
			el.style.left = `${2 + (i * (96 / count) + Math.random() * 2) % 96}%`;
			el.style.animationDuration = `${7 + Math.random() * 8}s`;
			el.style.animationDelay = `${-(Math.random() * 15)}s`;
			el.style.transform = `scale(${.65 + Math.random() * .5})`;
			el.innerHTML = i % 3 === 0 ? HEART : i % 2 === 0 ? PETAL_A : PETAL_B;
			container.appendChild(el);
		}
		return () => {
			container.replaceChildren();
		};
	}, []);
	return /* @__PURE__ */ jsx("div", {
		ref: containerRef,
		"aria-hidden": "true",
		className: "fixed inset-0 pointer-events-none z-40 overflow-hidden"
	});
}
//#endregion
//#region src/components/PageAmbience.tsx
/** Rising petals + desktop cursor trail + click heart burst. */
function PageAmbience() {
	const layerRef = useRef(null);
	useEffect(() => {
		const layer = layerRef.current;
		if (!layer) return;
		const mobile = window.matchMedia("(max-width: 767px)").matches;
		const floaters = [];
		if (mobile) for (let i = 0; i < 6; i++) floaters.push({
			x: .08 + Math.random() * .84,
			y: Math.random(),
			speed: .0011 + Math.random() * .0012,
			size: 5 + Math.random() * 5,
			opacity: .28 + Math.random() * .3,
			phase: Math.random() * Math.PI * 2,
			side: "full"
		});
		else for (let i = 0; i < 16; i++) {
			const left = i % 2 === 0;
			floaters.push({
				x: left ? .02 + Math.random() * .12 : .86 + Math.random() * .12,
				y: Math.random(),
				speed: .0014 + Math.random() * .0016,
				size: 5 + Math.random() * 7,
				opacity: .4 + Math.random() * .35,
				phase: Math.random() * Math.PI * 2,
				side: left ? "left" : "right"
			});
		}
		const specks = [];
		const mouse = {
			x: window.innerWidth / 2,
			y: window.innerHeight / 2,
			on: false
		};
		const trail = mobile ? [] : Array.from({ length: 8 }, (_, i) => ({
			x: mouse.x,
			y: mouse.y,
			ease: .18 - i * .015,
			size: 10 - i * .7,
			opacity: .55 - i * .055
		}));
		const burst = (x, y) => {
			const n = mobile ? 6 : 9;
			for (let i = 0; i < n; i++) {
				const a = Math.random() * Math.PI * 2;
				const s = 1.2 + Math.random() * 2.4;
				specks.push({
					x,
					y,
					vx: Math.cos(a) * s,
					vy: Math.sin(a) * s - 1.2,
					life: 1,
					size: 8 + Math.random() * 8
				});
			}
			while (specks.length > 40) specks.shift();
		};
		const onDown = (e) => {
			burst(e.clientX, e.clientY);
		};
		const onMove = (e) => {
			if (mobile) return;
			mouse.x = e.clientX;
			mouse.y = e.clientY;
			mouse.on = true;
		};
		const onLeave = () => {
			mouse.on = false;
		};
		let raf = 0;
		const els = floaters.map(() => {
			const el = document.createElement("span");
			el.style.cssText = "position:absolute;border-radius:60% 60% 55% 15%;background:linear-gradient(180deg,#F4B8C3,#E8A2AF);will-change:transform;pointer-events:none";
			layer.appendChild(el);
			return el;
		});
		const trailEls = trail.map((t) => {
			const el = document.createElement("span");
			const r = Math.round(t.size);
			el.style.cssText = "position:absolute;will-change:transform,opacity;pointer-events:none;opacity:0";
			el.innerHTML = `<svg width="${r}" height="${r}" viewBox="0 0 24 24" fill="none"><path d="M12 21.35L10.55 20.03C5.4 15.36 2 12.27 2 8.5C2 5.41 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.08C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.41 22 8.5C22 12.27 18.6 15.36 13.45 20.03L12 21.35Z" fill="#F4B8C3" fill-opacity="0.9"/></svg>`;
			layer.appendChild(el);
			return el;
		});
		const speckLayer = document.createElement("div");
		speckLayer.style.cssText = "position:absolute;inset:0;pointer-events:none";
		layer.appendChild(speckLayer);
		const MAX_SPECKS = 36;
		const speckEls = Array.from({ length: MAX_SPECKS }, () => {
			const el = document.createElement("span");
			el.style.cssText = "position:absolute;pointer-events:none;opacity:0;transform:translate(-50%,-50%)";
			el.setAttribute("aria-hidden", "true");
			speckLayer.appendChild(el);
			return el;
		});
		const speckSvg = (r) => `<svg width="${r}" height="${r}" viewBox="0 0 24 24" fill="none"><path d="M12 21.35L10.55 20.03C5.4 15.36 2 12.27 2 8.5C2 5.41 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.08C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.41 22 8.5C22 12.27 18.6 15.36 13.45 20.03L12 21.35Z" fill="#F4B8C3" fill-opacity="0.9"/></svg>`;
		const tick = () => {
			const w = window.innerWidth;
			const h = window.innerHeight;
			for (let i = 0; i < floaters.length; i++) {
				const f = floaters[i];
				f.y += f.speed;
				f.phase += .012;
				if (f.y > 1.06) {
					f.y = -.04;
					if (f.side === "left") f.x = .02 + Math.random() * .12;
					else if (f.side === "right") f.x = .86 + Math.random() * .12;
					else f.x = .08 + Math.random() * .84;
				}
				const px = f.x * w + Math.sin(f.phase) * 8;
				const py = (1 - f.y) * h;
				const el = els[i];
				el.style.width = `${f.size}px`;
				el.style.height = `${f.size * 1.25}px`;
				el.style.opacity = String(f.opacity);
				el.style.transform = `translate3d(${px}px, ${py}px, 0) translate(-50%,-50%) rotate(${Math.sin(f.phase) * 16}deg)`;
			}
			if (trail.length) {
				let tx = mouse.x;
				let ty = mouse.y;
				for (let i = 0; i < trail.length; i++) {
					const d = trail[i];
					d.x += (tx - d.x) * d.ease;
					d.y += (ty - d.y) * d.ease;
					tx = d.x;
					ty = d.y;
					const el = trailEls[i];
					el.style.opacity = mouse.on ? String(d.opacity) : "0";
					el.style.transform = `translate3d(${d.x}px, ${d.y}px, 0) translate(-50%,-50%) scale(${mouse.on ? 1 : .6})`;
				}
			}
			for (let i = specks.length - 1; i >= 0; i--) {
				const s = specks[i];
				s.x += s.vx;
				s.y += s.vy;
				s.vy += .035;
				s.life -= .04;
				if (s.life <= 0) specks.splice(i, 1);
			}
			for (let i = 0; i < MAX_SPECKS; i++) {
				const s = specks[i];
				const el = speckEls[i];
				if (!s) {
					el.style.opacity = "0";
					continue;
				}
				const r = Math.round(s.size);
				if (el.dataset.r !== String(r)) {
					el.dataset.r = String(r);
					el.innerHTML = speckSvg(r);
				}
				el.style.left = `${s.x}px`;
				el.style.top = `${s.y}px`;
				el.style.opacity = String(s.life * .85);
				el.style.transform = `translate(-50%,-50%) scale(${.6 + s.life * .4})`;
			}
			raf = requestAnimationFrame(tick);
		};
		window.addEventListener("pointerdown", onDown, { passive: true });
		window.addEventListener("pointermove", onMove, { passive: true });
		document.addEventListener("mouseleave", onLeave);
		raf = requestAnimationFrame(tick);
		return () => {
			window.removeEventListener("pointerdown", onDown);
			window.removeEventListener("pointermove", onMove);
			document.removeEventListener("mouseleave", onLeave);
			cancelAnimationFrame(raf);
			layer.replaceChildren();
		};
	}, []);
	return /* @__PURE__ */ jsx("div", {
		ref: layerRef,
		"aria-hidden": "true",
		className: "pointer-events-none fixed inset-0 z-[35] overflow-hidden"
	});
}
//#endregion
//#region src/pages/index.astro
var pages_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Index,
	file: () => $$file,
	url: () => ""
});
createAstro("https://astro.build");
var $$Index = createComponent(async ($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Index;
	const guestIdParam = Astro.url.searchParams.get("g") ?? void 0;
	let guestId;
	let guestName;
	let guestStatus;
	let guestCount = 0;
	if (guestIdParam) {
		const guest = await getGuest(guestIdParam);
		if (guest) {
			guestId = guestIdParam;
			guestName = guest.name;
			guestStatus = guest.status;
			guestCount = guest.count;
		}
	}
	if (!guestName) guestName = Astro.url.searchParams.get("guest") ?? void 0;
	if (guestName) guestName = formatGuestName(guestName);
	return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "guestName": guestName }, { "default": ($$result) => renderTemplate`${renderComponent($$result, "InvitationGate", InvitationGate, {
		"client:load": true,
		"guestName": guestName,
		"client:component-hydration": "load",
		"client:component-path": "C:/Users/Fulail/Desktop/wedding-in/src/components/InvitationGate.tsx",
		"client:component-export": "default"
	})}${renderComponent($$result, "FallingPetals", FallingPetals, {
		"client:load": true,
		"client:component-hydration": "load",
		"client:component-path": "C:/Users/Fulail/Desktop/wedding-in/src/components/FallingPetals.tsx",
		"client:component-export": "default"
	})}${renderComponent($$result, "PageAmbience", PageAmbience, {
		"client:load": true,
		"client:component-hydration": "load",
		"client:component-path": "C:/Users/Fulail/Desktop/wedding-in/src/components/PageAmbience.tsx",
		"client:component-export": "default"
	})}${renderComponent($$result, "AudioPlayer", AudioPlayer, {
		"client:load": true,
		"client:component-hydration": "load",
		"client:component-path": "C:/Users/Fulail/Desktop/wedding-in/src/components/AudioPlayer.tsx",
		"client:component-export": "default"
	})}${maybeRenderHead($$result)}<main class="w-full min-h-screen flex flex-col items-center overflow-x-hidden pt-8 sm:pt-14 px-4 sm:px-5 pb-[env(safe-area-inset-bottom)]">${renderComponent($$result, "HeroBanner", HeroBanner, {
		"client:load": true,
		"guestName": guestName,
		"client:component-hydration": "load",
		"client:component-path": "C:/Users/Fulail/Desktop/wedding-in/src/components/HeroBanner.tsx",
		"client:component-export": "default"
	})}${renderComponent($$result, "CountdownTimer", CountdownTimer, {
		"client:load": true,
		"client:component-hydration": "load",
		"client:component-path": "C:/Users/Fulail/Desktop/wedding-in/src/components/CountdownTimer.tsx",
		"client:component-export": "default"
	})}${renderComponent($$result, "EventDetails", EventDetails, {
		"client:load": true,
		"client:component-hydration": "load",
		"client:component-path": "C:/Users/Fulail/Desktop/wedding-in/src/components/EventDetails.tsx",
		"client:component-export": "default"
	})}${renderComponent($$result, "RsvpSection", RsvpSection, {
		"client:load": true,
		"guestId": guestId,
		"guestName": guestName,
		"initialStatus": guestStatus,
		"initialCount": guestCount,
		"client:component-hydration": "load",
		"client:component-path": "C:/Users/Fulail/Desktop/wedding-in/src/components/RsvpSection.tsx",
		"client:component-export": "default"
	})}${renderComponent($$result, "Footer", Footer, {
		"client:load": true,
		"client:component-hydration": "load",
		"client:component-path": "C:/Users/Fulail/Desktop/wedding-in/src/components/Footer.tsx",
		"client:component-export": "default"
	})}</main>` })}`;
}, "C:/Users/Fulail/Desktop/wedding-in/src/pages/index.astro", void 0);
var $$file = "C:/Users/Fulail/Desktop/wedding-in/src/pages/index.astro";
//#endregion
//#region \0virtual:astro:page:src/pages/index@_@astro
var page = () => pages_exports;
//#endregion
export { page };
