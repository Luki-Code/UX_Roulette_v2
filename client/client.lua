Framework = nil
ESX = nil
isOpened = false --is roulette opened?


if Config.Framework == 'ESX' then

  Citizen.CreateThread(function()
      while not Framework do
          TriggerEvent('esx:getSharedObject', function(obj)
              Framework = obj
          end)
          Citizen.Wait(10)
      end
  end)

  RegisterNetEvent('roulette:on')
  AddEventHandler('roulette:on', function()

    Framework.TriggerServerCallback("BalanceStatement", function (cb)
      print(cb.balance)
      SendNUIMessage({
        type = "ui",
        guthaben = cb.balance,
        display = true,
        counter = cb.timeLeft,
        SetNuiFocus(true, true)

    })
        isOpened = true
  end)
end)



  RegisterNUICallback('RemoveMoneyFromBets', function(data)
    Framework.TriggerServerCallback("RemoveMoneyFromBetsServer", function(cb)
      SendNUIMessage({
        guthaben = cb
       })
    end, data.moneyPlaced)


  end)


  RegisterNUICallback('AddMoneyFromWin', function(win)
    Framework.TriggerServerCallback("AddMoneyFromWinServer", function(cb)
  SendNUIMessage({
   guthaben = cb
   })
    end, win.win)

  end)



  elseif Config.Framework == 'QBCore' then

    Citizen.CreateThread(function()
        while not Framework do
            Framework = exports['qb-core']:GetCoreObject()
            Citizen.Wait(10)
        end
    end)

    RegisterNetEvent('roulette:on')
    AddEventHandler('roulette:on', function()

        Framework.Functions.TriggerCallback("BalanceStatement", function (cb)
            SendNUIMessage({
                type = "ui",
                guthaben = cb.balance,
                display = true,
                counter = cb.timeLeft,
                SetNuiFocus(true, true)

            })
        end)
    end)

    RegisterNUICallback('RemoveMoneyFromBets', function(data)
        Framework.Functions.TriggerCallback("RemoveMoneyFromBetsServer", function(cb)
            SendNUIMessage({
                guthaben = cb
            })
        end, data.moneyPlaced)


    end)


    RegisterNUICallback('AddMoneyFromWin', function(win)
        Framework.Functions.TriggerCallback("AddMoneyFromWinServer", function(cb)
            SendNUIMessage({
                guthaben = cb
            })

        end, win.win)
    end)


end



Citizen.CreateThread(function()
    for k,v in ipairs(Config.Dealers) do
    RequestModel(v.PedId)
    while not HasModelLoaded(GetHashKey(v.PedId)) do
      Citizen.Wait(1)
    end
    if (v.CustomPed == true) then
    ped = CreatePed(1, v.PedId,v.Coords, v.Heading, false, true)
    SetPedComponentVariation(ped, 0, v.FaceId, v.FaceId2, 0)
    SetPedPropIndex(ped, 0, v.HelmetId, v.HelmetId2, 0)
    SetPedComponentVariation(ped, 2, v.HairsId, v.HairsId2, 0)
    SetPedComponentVariation(ped, 8, v.TShirtId, v.TShirtId2, 0)
    SetPedComponentVariation(ped, 11, v.TorsoId, v.TorsoId2, 0)
    SetPedComponentVariation(ped, 3, v.ArmsId, v.ArmsId2, 0)
    SetPedComponentVariation(ped, 4, v.PantsId, v.PantsId2, 0)
    SetPedComponentVariation(ped, 6, v.ShoesId, v.ShoesId2, 0)
    SetPedPropIndex(ped, 1, v.GlassedId, v.GlassedId2, 1)
    SetPedHeadBlendData(ped, 0, 0, 0, v.SkinId, 0, 0, 0, 0, 0, false)
    else
    ped = CreatePed(1, v.PedId,v.Coords, v.Heading, false, true)
    end
    FreezeEntityPosition(ped, true)
    SetEntityInvincible(ped, true)
    SetBlockingOfNonTemporaryEvents(ped, true)
  end
end)






local requiredDistance = Config.OpenRange --Meters

Citizen.CreateThread(function()
    local playerPos = GetEntityCoords(PlayerPedId())

    while true do
        local shortestDistance = math.huge
        for name,coords in pairs(Config.OpenPoints) do
            playerPos = GetEntityCoords(PlayerPedId())


            local distance = #(playerPos - coords)

            if distance < shortestDistance then
                shortestDistance = distance

            end

            if distance <= requiredDistance then


                while distance <= requiredDistance do
                  if (IsControlJustReleased(0, 38)) then
                    TriggerEvent("roulette:on")

                  end
                    Citizen.Wait(0)


                    playerPos = GetEntityCoords(PlayerPedId())
                    distance = #(playerPos - coords)
                end
              end
        end
        Citizen.Wait(100 + math.floor(shortestDistance * 10)) -- Increases the waiting time by the player distance -> 500 meter == 5 seconds / 30m == 400 milliseconds += 100ms base tick
    end
end)


RegisterNetEvent("Roulette:refreshBettingTimeCounter")
AddEventHandler("Roulette:refreshBettingTimeCounter", function (counter)
      if isOpened == true then
        SendNUIMessage({
            type = "ui",
            counter = counter
        })
        print("LUA: Timer wurde aktualisiert")
        else
        print("LUA: Timer wurde nicht aktualisiert UI nicht geöffnet")
    end
end)


RegisterNetEvent("Roulette:refreshSpinningTimeCounter")
AddEventHandler("Roulette:refreshSpinningTimeCounter", function (counter)
      if isOpened == true then
        SendNUIMessage({
            type = "ui",
            counter = counter
        })
        print("LUA: Timer wurde aktualisiert")
        else
        print("LUA: Timer wurde nicht aktualisiert UI nicht geöffnet")
    end
end)

RegisterNetEvent('Roulette:startSpin')
AddEventHandler('Roulette:startSpin', function(randomNumber)
    if isOpened == true then
        SendNUIMessage({
            type = "ui",
            action = "startSpin",
            randomNumber = randomNumber
        })
        print("LUA: Spin wurde gestartet")
        else
        print("LUA: Spin konnte nicht gestartet werden, weil Roulette nicht geöffnet ist")
    end
end)

RegisterNetEvent('Roulette:openBettingTime')
AddEventHandler('Roulette:openBettingTime', function()

    SendNUIMessage({
        type = "ui",
        action = "openBettingTime"
    })

end)
--[[
  RegisterNetEvent('Roulette:playSound')
  AddEventHandler('Roulette:playSound', function(soundFile, soundVolume)
    if (Config.ActivateSounds == true) then
      SendNUIMessage({
          transactionType     = 'playSound',
          transactionFile     = soundFile,
          transactionVolume   = soundVolume
      })
    end
  end)


end)
--]]



--[[
RegisterNUICallback('NotEnoughChips', function(data)
  TriggerEvent('notifications', "#ffd800", "Roulette", "Du hast für diesen Jeton nicht genug Chips! ")
  TriggerEvent('notifications', "#ffd800", "Roulette", "Dir fehlen: "..data.currentChip- (data.guthaben-data.moneyPlaced).." Chips")
end)



RegisterNUICallback('NotEnoughChips2', function(data)
  TriggerEvent('notifications', "#ffd800", "Roulette", "Du hast nicht genug Chips!")
  TriggerEvent('notifications', "#ffd800", "Roulette", "Dir fehlen: "..data.amount- (data.guthaben-data.moneyPlaced).." Chips")
end)

RegisterNUICallback('NotEnoughChips3', function(data)
  TriggerEvent('notifications', "#ffd800", "Roulette", "Du hast nicht genug Chips!")
  TriggerEvent('notifications', "#ffd800", "Roulette", "Dir fehlen: "..data.moneyPlaced-data.guthaben.." Chips")
end)

RegisterNUICallback('BetsAlreadyClosed', function()
  TriggerEvent('notifications', "#ffd800", "Roulette", "Die Betten sind bereits geschlossen! ")

end)
-]]


RegisterNUICallback('NUIOFF', function()
    SetNuiFocus(false, false)
    rouletteOff()
    isOpened = false
  end)


  --[[
  RegisterNUICallback('SendBetNotify', function(values)


    TriggerEvent("Roulette:playSound", "bet", 1)
    TriggerEvent('notifications', "#ffd800", "Roulette", "Du hast "..values.moneyToAdd.." Chips auf "..values.field.." gesetzt!")
  end)


  RegisterNUICallback('BetsClearNotify', function()

    TriggerEvent("Roulette:playSound", "return", 1)

    TriggerEvent('notifications', "#ffd800", "Roulette", "Du hast die Einsätze entfernt!")

  end)

  RegisterNUICallback('BetsReturnNotify', function(values)

    TriggerEvent("Roulette:playSound", "return", 1)

    TriggerEvent('notifications', "#ffd800", "Roulette", "Du hast "..values.lastAmount.." Chips von "..values.lastField.." entfernt!")

  end)

  --]]






  function rouletteOff()
  SendNUIMessage({
    type = "ui",
    display = false,
    SetNuiFocus(false, false)

  })
end
  --Important






