Framework = nil


if Config.Framework == 'ESX' then
    TriggerEvent('esx:getSharedObject', function(obj) Framework = obj end)

    Framework.RegisterServerCallback("BalanceStatement", function(source, cb) 

      if (Config.UseItem == true and Config.UseMoney == false) then
        local xPlayer = Framework.GetPlayerFromId(source)
        local values = {balance = xPlayer.getInventoryItem(Config.ItemName).count, counter = timeLeft}
        cb(values)
        elseif (Config.UseItem == false and Config.UseMoney == true) then
        local xPlayer = Framework.GetPlayerFromId(source)
        local values = {balance = xPlayer.getMoney(), counter = timeLeft}
        cb(values)
        else
        print("ERROR WRONG SETTINGS IN CONFIG: MONEY OR ITEM MUST BE FALSE")
        end
    end)


    Framework.RegisterServerCallback("RemoveMoneyFromBetsServer", function(source, cb, moneyPlacedInteger)

      local xPlayer = Framework.GetPlayerFromId(source)
      if (Config.UseItem == true and Config.UseMoney == false) then
      balance = xPlayer.getInventoryItem(Config.ItemName).count
      elseif (Config.UseItem == false and Config.UseMoney == true) then
      balance = xPlayer.getMoney()
      end
      if (tonumber(moneyPlacedInteger) <= balance) then
      TriggerClientEvent("Roulette:playSound", source, "spin", 1)
      DiscordLog(source,' [ROULETTE]',Config.Webhook,"\n- SETTER:\n"..GetPlayerName(source).."("..source..")\n- HEX:\n"..Framework.GetPlayerFromId(source).identifier.."\n- BETAMOUNT:\n"..moneyPlacedInteger.."\n - TIME:\n"..os.date()..'')
      if (Config.UseItem == true and Config.UseMoney == false) then
      --notifyitemplaced
      xPlayer.removeInventoryItem(Config.ItemName, moneyPlacedInteger)
      newbalance = xPlayer.getInventoryItem(Config.ItemName).count
      elseif (Config.UseItem == false and Config.UseMoney == true) then
      --notifymoneyplaced
      xPlayer.removeMoney(moneyPlacedInteger)
      newbalance = xPlayer.getMoney()
      end
      cb(newbalance)
      else
      cb(balance)
      --notifynotenoughchips
      end

    end)


    Framework.RegisterServerCallback("AddMoneyFromWinServer", function(source, cb, win)

      _src = source
      local xPlayer = Framework.GetPlayerFromId(source)
      DiscordLog(source,' [ROULETTE]',Config.Webhook,"\n- WINNER:\n"..GetPlayerName(source).."("..source..")\n- HEX:\n"..Framework.GetPlayerFromId(source).identifier.."\n- WINAMOUNT:\n"..win.."\n - TIME:\n"..os.date()..'')
      if (win > 0) then
      if (Config.UseItem == true and Config.UseMoney == false) then
      --winamount+newbalance
      xPlayer.addInventoryItem(Config.ItemName, win)
      newbalance = xPlayer.getInventoryItem(Config.ItemName).count
      elseif (Config.UseItem == false and Config.UseMoney == true) then
      --winamount+newbalance
      xPlayer.addMoney(win)
      newbalance = xPlayer.getMoney()
      end
      Wait(500)
      else
       --losenotify
      end
      cb(newbalance)
    end)





elseif Config.Framework == 'QBCore' then
  Framework = exports['qb-core']:GetCoreObject()
  Framework.Functions.CreateCallback("BalanceStatement", function(source, cb)
                local Player = Framework.Functions.GetPlayer(source)
                if (Config.UseItem == true and Config.UseMoney == false) then
                local values = {balance =Player.Functions.GetItemByName(Config.ItemName).amount, counter = timeLeft}
                cb(values)
                elseif (Config.UseItem == false and Config.UseMoney == true) then
                local values = {balance =Player.PlayerData.money['cash'], counter = timeLeft}
                cb(values)
                else
                print("ERROR WRONG SETTINGS IN CONFIG: MONEY OR ITEM MUST BE FALSE")
                end
            end)

    Framework.Functions.CreateCallback("RemoveMoneyFromBetsServer", function(source, cb, bets)
                local Player = Framework.Functions.GetPlayer(source)
                if (Config.UseItem == true and Config.UseMoney == false) then
                balance = Player.Functions.GetItemByName(Config.ItemName).amount
                elseif (Config.UseItem == false and Config.UseMoney == true) then
                balance = Player.PlayerData.money['cash']
                end
                if (tonumber(bets) <= balance) then
                DiscordLog(source,' [ROULETTE]',Config.Webhook,"\n- SETTER:\n"..GetPlayerName(source).."("..source..")\n-BETAMOUNT:\n"..bets.."\n - TIME:\n"..os.date()..'')
                if (Config.UseItem == true and Config.UseMoney == false) then
                --notifyitemplaced
                Player.Functions.RemoveItem(Config.ItemName, bets)
                newbalance = Player.Functions.GetItemByName(Config.ItemName).amount
                elseif (Config.UseItem == false and Config.UseMoney == true) then
                --notifymoneyplaced
                Player.Functions.RemoveMoney('cash', bets)
                Player.Functions.UpdatePlayerData()
                newbalance = Player.Functions.GetMoney('cash')
                end
                    cb(newbalance)
                else
                --notifynotenoughchips
                end
            end)

    Framework.Functions.CreateCallback("AddMoneyFromWinServer", function(source, cb, win)
              _src = source
                local Player = Framework.Functions.GetPlayer(source)
                DiscordLog(source,' [ROULETTE]',Config.Webhook,"\n- WINNER:\n"..GetPlayerName(source).."("..source..")\n-WINAMOUNT:\n"..win.."\n - TIME:\n"..os.date()..'')
                if (win > 0) then
                if (Config.UseItem == true and Config.UseMoney == false) then
                --winamount+newbalance
                Player.Functions.AddItem(Config.ItemName, win)
                Player.Functions.UpdatePlayerData()
                newbalance = Player.Functions.GetItemByName(Config.ItemName).amount
                elseif (Config.UseItem == false and Config.UseMoney == true) then
                --winamount+newbalance
                Player.Functions.AddMoney('cash', win)
                Player.Functions.UpdatePlayerData()
                newbalance = Player.Functions.GetMoney('cash')
                end
                else
                 --losenotify
                end

                cb(newbalance)
        end)
end





bettingTime = true
isSpinning = false
counter = 0



Citizen.CreateThread(function()
    while true do
        Citizen.Wait(0)
        if bettingTime then
            Citizen.Wait(1000)
            print("während der bettingtime einmal 1s hochgezählt")
            counter = counter + 1
            timeLeft = Config.BettingTime - counter;
            TriggerClientEvent("Roulette:refreshBettingTimeCounter", -1, timeLeft)
            if counter == 20 then
                bettingTime = false
                counter = 0
                isSpinning = true
                TriggerClientEvent("Roulette:startSpin", -1, GenerateRandomNumber())
                print("hure".. GenerateRandomNumber() .."")
            end
        end
    end
end)

Citizen.CreateThread(function()
    while true do
        Citizen.Wait(0)
        if isSpinning then
            Citizen.Wait(1000)
            print("während der spinningtime einmal 1s hochgezählt")
            counter = counter + 1
            timeLeft = 12 - counter

            TriggerClientEvent("Roulette:refreshSpinningTimeCounter", -1, timeLeft)
            if counter == 12 then
                isSpinning = false
                counter = 0
                bettingTime = true
                TriggerClientEvent("Roulette:openBettingTime", -1, timeLeft)
            end
        end
    end
end)


function GenerateRandomNumber()
    local randomNumber = math.random()
    return randomNumber
end

function DiscordLog(xPlayer,description,webhook,extra)
	local headers = {
	  ['Content-Type'] = 'application/json'
	}
	local data = {
	  ["embeds"] = {{
		["author"] = {
            ["name"] = description..'\n'..extra..''
          },
		["color"] = 15105570,
		["timestamp"] = os.date("!%Y-%m-%dT%H:%M:%SZ")
	  }}
	}
	PerformHttpRequest(Config.Webhook, function(err, text, headers) end, 'POST', json.encode(data), headers)
end
