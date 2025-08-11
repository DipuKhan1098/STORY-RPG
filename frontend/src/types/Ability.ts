/**
 * Ability.ts
 * PURPOSE:
 *  - Passive effects the player can have (from race, class, gear, quests).
 *
 * FIELDS (spec):
 *  - id: string
 *  - name: string
 *  - description: string
 *  - effects:
 *      {
 *        stats?: Partial<StatBlock>;                          // flat bonuses
 *        regen?: { hpPerTurn?: number; mpPerTurn?: number };  // per-turn base regen
 *        multipliers?: {
 *          physicalDealt?: number; magicalDealt?: number;     // % add
 *          physicalTaken?: number; magicalTaken?: number;     // % add (negative reduces)
 *          armor?: number;                                    // flat or % based on design (document)
 *          expGain?: number;                                  // % EXP gain modifier
 *        };
 *        elemental?: { offense?: ElementMap; defense?: ElementMap };
 *        crit?: { base?: number; perDexDisparity?: number };  // % values; clamp [0..100]
 *        escape?: { base?: number; perAgiDisparity?: number };// % clamp [5..95]
 *      }
 *  - requirements?: Requirements                              // to learn/activate
 *  - isRaceAbility?: boolean                                   // true when innate race ability
 *  - asset?: AssetRef
 *
 * NOTES:
 *  - Dedupe by id when multiple sources grant same ability.
 *  - Effects stack additively unless future "stacking" policy is introduced.
 */
